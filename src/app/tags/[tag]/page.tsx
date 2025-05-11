import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

interface Article {
  slug: string[];
  title: string;
  tags: string[];
}

interface PageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  const tagSet = new Set<string>();
  
  files.forEach(file => {
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag: string) => {
        tagSet.add(tag);
      });
    }
  });

  return Array.from(tagSet).map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function TagPage({ params }: PageProps) {
  const resolvedParams = await params;
  const decodedTag = decodeURIComponent(resolvedParams.tag);
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  const articles: Article[] = files
    .map(file => {
      const filePath = path.join(notesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      return {
        slug: file.replace(/\.md$/, '').split(path.sep),
        title: data.title || file.replace(/\.md$/, ''),
        tags: data.tags?.map((t: string) => decodeURIComponent(t)) || [],
      };
    })
    .filter(article => article.tags.includes(decodedTag))
    .sort((a, b) => a.title.localeCompare(b.title));

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        タグ: {decodedTag}
      </h1>
      <div className="space-y-4">
        {articles.map(article => (
          <Link
            key={article.slug.join('/')}
            href={`/${article.slug.join('/')}`}
            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-medium">{article.title}</h2>
            <div className="flex gap-2 mt-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 