import { notFound } from 'next/navigation';
import ProductDetail from '@/components/product/ProductDetail';
import { getProductById } from '@/lib/products';

export async function generateStaticParams() {
  const products = await fetch('https:///products')
    .then(res => res.json())
    .catch(() => []);

  return products.map((product: { id: string | number }) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}
