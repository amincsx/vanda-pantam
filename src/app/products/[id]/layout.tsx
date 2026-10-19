import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { products } from '@/data/products';

interface ProductLayoutProps {
  children: ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);

  if (!product) {
    return { title: 'محصول پیدا نشد' };
  }

  const canonical = `/products/${product.id}`;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description: product.description,
      url: canonical,
      images: [product.images.front],
    },
  };
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return children;
}
