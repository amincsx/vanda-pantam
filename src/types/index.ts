export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  author: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  images: {
    front: string;
    side: string;
    back: string;
    sideView: string;
  };
  price?: number;
  inStock: boolean;
  features?: string[];
}

export interface ProductImage {
  src: string;
  alt: string;
  angle: 'front' | 'side' | 'back';
}