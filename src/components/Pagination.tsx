import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white"
        >
          前へ
        </Link>
      )}
      
      {visiblePages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700 text-white'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 text-white"
        >
          次へ
        </Link>
      )}
    </div>
  );
} 