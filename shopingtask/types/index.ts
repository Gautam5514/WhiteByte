export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description?: string;
  image: string;
  gallery?: string[];
  category?: string;
  rating?: number;
  reviewCount?: number;
  quantity?: number;
  features?: string[];
  specifications?: Record<string, string>;
  relatedProducts?: RelatedProduct[];
}

export interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PriceRange {
  min: number;
  max: number;
}