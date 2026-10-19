import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'پنتام مجازی | نواختن هندپن آنلاین',
  description: 'هندپن مجازی واندا را آنلاین بنوازید و صدا و گام هندپن‌های ۹، ۱۲ و ۱۴ نت را تجربه کنید.',
  alternates: { canonical: '/virtual-pantam' },
  openGraph: {
    title: 'پنتام مجازی واندا',
    description: 'هندپن مجازی واندا را آنلاین بنوازید و گام‌های مختلف را تجربه کنید.',
    url: '/virtual-pantam',
  },
};

export default function VirtualPantamLayout({ children }: { children: ReactNode }) {
  return children;
}
