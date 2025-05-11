import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Search from '@/components/Search';

interface SearchIndex {
  title: string;
  content: string;
  slug: string;
  tags: string[];
}

async function generateSearchIndex(): Promise<SearchIndex[]> {
  const notesDir = path.join(process.cwd(), 'notes');
  const files = fs.readdirSync(notesDir, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

  return files.map(file => {
    const filePath = path.join(notesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    // マークダウンの内容からHTMLタグを除去
    const plainContent = markdownContent.replace(/<[^>]*>/g, '');
    
    return {
      title: data.title || '',
      content: plainContent,
      slug: file.replace(/\.md$/, ''),
      tags: data.tags || []
    };
  });
}

export default async function SearchPage() {
  const searchIndex = await generateSearchIndex();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事検索</h1>
      <div className="max-w-2xl mx-auto">
        <Search initialSearchIndex={searchIndex} />
      </div>
    </div>
  );
} 