'use client';

import { getProducts } from '@/lib/products';
import ProductCard from './ProductCard';
import { PriceRange } from '@/types';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductGridProps {
  query?: string;
  category?: string;
  priceRange?: PriceRange;
}

export default function ProductGrid({
  query = '',
  category = '',
  priceRange = { min: 0, max: 5000 }
}: ProductGridProps) {
  const products = getProducts({ query, category, priceRange });
  
  useEffect(() => {
    // This creates a scroll animation effect when filters are changed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, category, priceRange]);
  
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold mb-2">No products found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}