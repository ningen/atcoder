import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
};

export default async function NotesPage() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <div className="grid gap-4">
        {files.map((file) => {
          const slug = file.replace(/\.md$/, '');
          return (
            <Link
              key={slug}
              href={`/${slug}`}
              className="p-4 border rounded hover:bg-gray-50"
            >
              {slug}
            </Link>
          );
        })}
      </div>
    </div>
  );
} 