import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import NoteLink from '@/components/NoteLink';

interface Article {
  slug: string[];
  title: string;
  tags: string[];
  date: string;
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
      const stats = fs.statSync(filePath);
      return {
        slug: file.replace(/\.md$/, '').split(path.sep),
        title: data.title || file.replace(/\.md$/, ''),
        tags: data.tags || [],
        date: stats.birthtime.toISOString()
      };
    })
    .filter(article => article.tags.includes(decodedTag))
    .sort((a, b) => a.title.localeCompare(b.title));

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'タグ一覧', href: '/tags' },
          { label: decodedTag }
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">
        タグ: {decodedTag}
      </h1>
      <div className="space-y-4">
        {articles.map(article => (
          <NoteLink
            key={article.slug.join('/')}
            href={`/${article.slug.join('/')}`}
            title={article.title}
            date={article.date}
            tags={article.tags}
          />
        ))}
      </div>
    </div>
  );
} 