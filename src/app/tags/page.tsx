import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Breadcrumb from '@/components/Breadcrumb';

interface TagInfo {
  tag: string;
  count: number;
}

export default function TagsPage() {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  const tagMap = new Map<string, number>();
  
  files.forEach(file => {
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach((tag: string) => {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      });
    }
  });

  const tags: TagInfo[] = Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'タグ一覧' }]} />
      <h1 className="text-3xl font-bold mb-8">タグ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{tag}</span>
              <span className="text-sm text-gray-500">{count}記事</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 