'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            AtCoder Notes
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/search"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              検索
            </Link>
            <Link
              href="/tags"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              タグ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 