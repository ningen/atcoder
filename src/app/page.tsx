import { promises as fs } from 'fs';
import path from 'path';
import NoteLink from '@/components/NoteLink';
import Breadcrumb from '@/components/Breadcrumb';
import { Metadata } from 'next';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: 'AtCoder Study Notes',
  description: 'AtCoderの学習記録',
};

interface Note {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

async function getLatestNotes() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = await fs.readdir(notesDir, { recursive: true });
  
  const notes: Note[] = await Promise.all(
    files
      .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(notesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const { data } = matter(content);
        const slug = file.replace(/\.md$/, '');
        const stats = await fs.stat(filePath);
        
        return {
          slug,
          title: data.title || slug,
          date: stats.birthtime.toISOString(),
          tags: data.tags || []
        };
      })
  );

  return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function Home() {
  const notes = await getLatestNotes();
  const latestNotes = notes.slice(0, 10);

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb items={[]} />
      <h1 className="text-3xl font-bold mb-6">最新の記事</h1>
      <div className="space-y-4">
        {latestNotes.map((note) => (
          <NoteLink
            key={note.slug}
            href={`/${note.slug.split('/').map(encodeURIComponent).join('/')}`}
            title={note.title}
            date={note.date}
            tags={note.tags}
          />
        ))}
      </div>
    </main>
  );
} 