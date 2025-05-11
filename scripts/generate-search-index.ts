import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface SearchIndex {
  title: string;
  content: string;
  slug: string;
  tags: string[];
}

const notesDir = path.join(process.cwd(), 'notes');
const outputDir = path.join(process.cwd(), 'public');

// 記事の内容を取得
const files = fs.readdirSync(notesDir, { recursive: true })
  .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'));

const searchIndex: SearchIndex[] = files.map(file => {
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

// 検索インデックスをJSONファイルとして保存
fs.writeFileSync(
  path.join(outputDir, 'search-index.json'),
  JSON.stringify(searchIndex, null, 2)
); 