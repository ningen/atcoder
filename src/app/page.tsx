import { promises as fs } from 'fs';
import path from 'path';
import { Dirent } from 'fs';
import NoteLink from '@/components/NoteLink';
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
        
        return {
          slug,
          title: data.title || slug,
          date: data.date || '',
          tags: data.tags || []
        };
      })
  );

  return notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function Home() {
  const notes = await getLatestNotes();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">最新の記事</h1>
      <div className="space-y-4">
        {notes.map((note) => (
          <NoteLink
            key={note.slug}
            href={`/${note.slug}`}
            title={note.title}
            date={note.date}
            tags={note.tags}
          />
        ))}
      </div>
    </main>
  );
} 