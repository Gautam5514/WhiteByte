import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import { getProductById } from '@/lib/products';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}