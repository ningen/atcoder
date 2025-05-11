import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const searchIndexPath = path.join(process.cwd(), 'public', 'search-index.json');
  const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, 'utf-8'));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = searchIndex.filter((item: any) => {
    const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
    return searchableText.includes(query);
  });

  return NextResponse.json({ results });
} 