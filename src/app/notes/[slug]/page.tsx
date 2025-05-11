import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: resolvedParams.slug,
  };
}

export default async function NotePage({ params }: PageProps) {
  const resolvedParams = await params;
  const filePath = path.join(process.cwd(), 'notes', `${resolvedParams.slug}.md`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const html = marked(content);

    return (
      <div className="container mx-auto px-4 py-8">
        <article 
          className="prose lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  } catch {
    notFound();
  }
} 