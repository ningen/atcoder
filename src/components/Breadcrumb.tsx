import Link from 'next/link';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-4" aria-label="パンくずリスト">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            ホーム
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-2 text-gray-500 dark:text-gray-400">/</span>
            {item.href ? (
              <Link href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
} 