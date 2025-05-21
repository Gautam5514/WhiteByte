import ProductGrid from '@/components/product/ProductGrid';
import Sidebar from '@/components/layout/Sidebar';
import { Suspense } from 'react';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';

export default function Home({
  searchParams,
}: {
  searchParams?: { 
    query?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : 0;
  const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : 5000;

  return (
    <main className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid 
            query={query}
            category={category}
            priceRange={{ min: minPrice, max: maxPrice }}
          />
        </Suspense>
      </div>
    </main>
  );
}