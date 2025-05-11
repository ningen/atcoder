import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { marked } from 'marked';

export default function NotePage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'notes', `${params.slug}.md`);
  
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
  } catch (error) {
    notFound();
  }
} 