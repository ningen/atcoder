import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import hljs from 'highlight.js';
import matter from 'gray-matter';
import NoteLink from '@/components/NoteLink';
import Breadcrumb from '@/components/Breadcrumb';
import 'highlight.js/styles/github-dark.css';

// markedの設定
marked.use({
  renderer: {
    code(this, code) {
      const validLanguage = code.lang && hljs.getLanguage(code.lang) ? code.lang : 'plaintext';
      const highlighted = hljs.highlight(code.text, { language: validLanguage }).value;
      return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
    }
  }
});

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Helper function to handle URL encoding/decoding
function normalizeSlug(slug: string[]) {
  return slug.map(segment => decodeURIComponent(segment));
}

function getAllPaths(dir: string, basePath: string[] = []): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths: string[][] = [];
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = [...basePath, entry.name];
    
    if (entry.isDirectory()) {
      paths.push(relativePath);
      paths.push(...getAllPaths(fullPath, relativePath));
    } else if (entry.name.endsWith('.md')) {
      paths.push(relativePath.map(p => p.replace(/\.md$/, '')));
    }
  }
  
  return paths;
}

export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), 'notes');
  const paths = getAllPaths(notesDir);
  
  return paths.map((pathSegments) => ({
    // スラッグ全体を配列のまま維持し、パスセグメントとして扱えるようにする
    slug: pathSegments,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const title = resolvedParams.slug.length === 0 ? 'コンテンツ一覧' : resolvedParams.slug.join('/');
  return {
    title,
  };
}

export default async function NotePage({ params }: PageProps) {
  const resolvedParams = await params;
  // Normalize the slug to handle URL encoding
  const normalizedSlug = normalizeSlug(resolvedParams.slug);
  const basePath = path.join(process.cwd(), 'notes', ...normalizedSlug);
  const mdPath = basePath + '.md';
  
  try {
    // まずマークダウンファイルを試す
    const fileContent = fs.readFileSync(mdPath, 'utf-8');
    const { content, data } = matter(fileContent);
    const html = marked(content);

    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={normalizedSlug.map((part, index) => ({
            label: part,
            href: index === normalizedSlug.length - 1 ? undefined : `/${normalizedSlug.slice(0, index + 1).map(encodeURIComponent).join('/')}`
          }))}
        />
        {data.tags && data.tags.length > 0 && (
          <div className="flex gap-2 mb-4">
            {data.tags.map((tag: string) => (
              <a
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        )}
        <article 
          className="markdown prose lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  } catch {
    // マークダウンファイルが存在しない場合は、ディレクトリの内容を表示
    try {
      const entries = fs.readdirSync(basePath, { withFileTypes: true });
      const currentPath = normalizedSlug.join('/');

      return (
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb
            items={normalizedSlug.map((part, index) => ({
              label: part,
              href: index === normalizedSlug.length - 1 ? undefined : `/${normalizedSlug.slice(0, index + 1).map(encodeURIComponent).join('/')}`
            }))}
          />
          <h1 className="text-3xl font-bold mb-6">{currentPath || 'コンテンツ一覧'}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry) => {
              const name = entry.name.replace(/\.md$/, '');
              const fullPath = path.join(basePath, entry.name);
              const stats = fs.statSync(fullPath);
              const createdAt = stats.birthtime.toISOString();
              return (
                <NoteLink
                  key={entry.name}
                  href={`/${currentPath ? currentPath + '/' : ''}${encodeURIComponent(name)}`}
                  title={name}
                  isDirectory={entry.isDirectory()}
                  date={createdAt}
                />
              );
            })}
          </div>
        </div>
      );
    } catch (dirError) {
      console.error(`Failed to load directory: ${basePath}`, dirError);
      notFound();
    }
  }
} 