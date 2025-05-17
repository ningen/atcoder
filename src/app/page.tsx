import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: 'Ningen AtCoder Study Notes',
  description: 'AtCoderの学習記録',
};

interface Note {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

export default async function NotesPage() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  const notes: Note[] = files.map((file) => {
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    const slug = file.replace(/\.md$/, '');
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || []
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">記事一覧</h1>
      <div className="space-y-4">
        {notes.map((note) => (
          <article key={note.slug} className="group">
            <Link
              href={`/${note.slug}`}
              className="block py-4 hover:bg-gray-800 -mx-4 px-4 rounded-lg transition-colors"
            >
              <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-medium text-white group-hover:text-blue-400">
                  {note.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm">
                  {note.date && (
                    <time dateTime={note.date} className="text-gray-400">
                      {new Date(note.date).toLocaleDateString('ja-JP', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                  {note.tags.length > 0 && (
                    <div className="flex space-x-2">
                      {note.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
} 