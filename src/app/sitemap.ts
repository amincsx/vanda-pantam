import { MetadataRoute } from 'next';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://vanda-pantam.com';
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/gallery',
        '/order',
        '/virtual-pantam',
    ];

    return [
        ...staticRoutes.map((route) => ({
            url: `${baseUrl}${route}`,
        })),
        ...products.map((product) => ({
            url: `${baseUrl}/products/${product.id}`,
        })),
    ];
}
