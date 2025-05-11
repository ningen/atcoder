import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';

interface SearchResult {
  title: string;
  slug: string;
  tags: string[];
  content: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        console.error('検索エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

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
        
        {isLoading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin h-6 w-6 border-2 border-gray-500 rounded-full border-t-transparent"></div>
          </div>
        )}
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
      ) : query && !isLoading ? (
        <div className="text-center text-gray-500 py-8">
          検索結果が見つかりませんでした
        </div>
      ) : null}
    </div>
  );
} 