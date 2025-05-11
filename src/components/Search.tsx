'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

interface SearchResult {
  title: string;
  slug: string;
  tags: string[];
  content: string;
}

interface SearchProps {
  initialSearchIndex: SearchResult[];
}

export default function Search({ initialSearchIndex }: SearchProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const searchResults = initialSearchIndex.filter(item => {
      const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
      return searchableText.includes(debouncedQuery.toLowerCase());
    });

    setResults(searchResults);
  }, [debouncedQuery, initialSearchIndex]);

  // 検索結果の内容を整形する関数
  const formatContent = (content: string, query: string) => {
    const maxLength = 200;
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    
    if (index === -1) {
      return content.slice(0, maxLength) + '...';
    }

    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    let formatted = content.slice(start, end);

    if (start > 0) formatted = '...' + formatted;
    if (end < content.length) formatted += '...';

    return formatted;
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="記事を検索..."
          className="w-full p-3 border rounded-lg text-lg"
        />
      </div>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/${result.slug}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium text-lg mb-2">{result.title}</div>
              <div className="text-sm text-gray-600 mb-2">
                {formatContent(result.content, query)}
              </div>
              <div className="text-sm text-gray-500">
                {result.tags.map(tag => `#${tag}`).join(' ')}
              </div>
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center text-gray-500 py-8">
          検索結果が見つかりませんでした
        </div>
      ) : null}
    </div>
  );
} 