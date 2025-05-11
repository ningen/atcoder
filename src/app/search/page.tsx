import Search from '@/components/Search';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">記事検索</h1>
      <div className="max-w-2xl mx-auto">
        <Search />
      </div>
    </div>
  );
} 