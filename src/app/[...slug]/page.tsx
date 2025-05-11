import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { Metadata } from 'next';
import hljs from 'highlight.js';
import matter from 'gray-matter';
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

export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  return files.map((file) => ({
    slug: file.replace(/\.md$/, '').split(path.sep),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), 'notes', ...resolvedParams.slug) + '.md';
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return {
      title: resolvedParams.slug.join('/'),
      description: data.description || '',
    };
  } catch {
    return {
      title: resolvedParams.slug.join('/'),
    };
  }
}

export default async function NotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), 'notes', ...resolvedParams.slug) + '.md';
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(fileContent);
    const html = marked(content);

    return (
      <div className="container mx-auto px-4 py-8">
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
  } catch (error) {
    console.error(`Failed to load file: ${filePath}`, error);
    notFound();
  }
} 