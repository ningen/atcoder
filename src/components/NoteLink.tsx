import Link from 'next/link';

interface NoteLinkProps {
  href: string;
  title: string;
  date?: string;
  tags?: string[];
  isDirectory?: boolean;
}

export default function NoteLink({ href, title, date, tags = [], isDirectory = false }: NoteLinkProps) {
  return (
    <article className="group">
      <Link
        href={href}
        className="block py-4 hover:bg-gray-800 -mx-4 px-4 rounded-lg transition-colors"
      >
        <div className="flex flex-col space-y-1">
          <h2 className="text-lg font-medium text-white group-hover:text-blue-400">
            {title}
            {isDirectory ? '/' : ''}
          </h2>
          {(date || tags.length > 0) && (
            <div className="flex items-center space-x-4 text-sm">
              {date && (
                <time dateTime={date} className="text-gray-400">
                  {new Date(date).toLocaleString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </time>
              )}
              {tags.length > 0 && (
                <div className="flex space-x-2">
                  {tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
} 