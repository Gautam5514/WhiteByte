import { Product } from '@/types';

// Sample product data
const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 349.99,
    description: 'Experience immersive audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and superior comfort for extended listening sessions.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gallery: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394654/pexels-photo-3394654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394655/pexels-photo-3394655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    rating: 4.8,
    reviewCount: 156,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Hi-Res Audio certified',
      'Comfortable over-ear design',
      'Fast charging - 5 hours playback from 10 minutes charge'
    ],
    specifications: {
      'Bluetooth Version': '5.2',
      'Battery': '700mAh',
      'Charging Time': '2 hours',
      'Weight': '285g',
      'Frequency Response': '20Hz - 40kHz'
    },
    relatedProducts: [
      {
        id: '2',
        name: 'Wireless Earbuds',
        price: 149.99,
        image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: '3',
        name: 'Portable Bluetooth Speaker',
        price: 129.99,
        image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: '5',
        name: 'Leather AirPods Case',
        price: 39.99,
        image: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: '8',
        name: 'Wireless Charging Pad',
        price: 49.99,
        image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ]
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 149.99,
    originalPrice: 179.99,
    description: 'True wireless earbuds with amazing sound quality, active noise cancellation, and sweat resistance. Perfect for workouts and everyday use.',
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 230
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    description: 'Waterproof, portable Bluetooth speaker with 360° sound and 24-hour battery life. Take your music anywhere with confidence.',
    image: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.5,
    reviewCount: 118
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and a 7-day battery life.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.7,
    reviewCount: 305
  },
  {
    id: '5',
    name: 'Leather AirPods Case',
    price: 39.99,
    description: 'Protect your AirPods in style with this premium leather case. Features a carabiner for easy carrying and wireless charging compatibility.',
    image: 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    rating: 4.3,
    reviewCount: 89
  },
  {
    id: '6',
    name: 'Minimalist Laptop Backpack',
    price: 79.99,
    description: 'A sleek, minimalist backpack with padded laptop compartment, water-resistant material, and hidden anti-theft pockets.',
    image: 'https://images.pexels.com/photos/1546003/pexels-photo-1546003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    rating: 4.8,
    reviewCount: 217
  },
  {
    id: '7',
    name: 'Mechanical Keyboard',
    price: 149.99,
    originalPrice: 179.99,
    description: 'Enhance your typing experience with this mechanical keyboard featuring customizable RGB lighting and tactile switches.',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.6,
    reviewCount: 142
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 49.99,
    description: 'Charge your compatible devices wirelessly with this sleek charging pad. Supports fast charging for the latest smartphones.',
    image: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'electronics',
    rating: 4.4,
    reviewCount: 98
  },
  {
    id: '9',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    description: 'Ultra-soft 100% organic cotton t-shirt with a relaxed fit. Available in multiple colors.',
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'clothing',
    rating: 4.5,
    reviewCount: 321
  },
  
  {
    id: '12',
    name: 'Vintage Leather Wallet',
    price: 49.99,
    description: 'Handcrafted vintage leather wallet with RFID protection and multiple card slots.',
    image: 'https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'accessories',
    rating: 4.6,
    reviewCount: 89
  }
];

// List of product categories
export const CATEGORIES = [...new Set(products.map(product => product.category as string))];

// Get all products (with optional filtering)
export function getProducts({
  query = '',
  category = '',
  priceRange = { min: 0, max: 5000 }
}: {
  query?: string;
  category?: string;
  priceRange?: { min: number; max: number };
} = {}) {
  return products.filter(product => {
    // Filter by search query
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      : true;
    
    // Filter by category
    const matchesCategory = category
      ? product.category === category
      : true;
    
    // Filter by price range
    const matchesPrice = 
      product.price >= priceRange.min && 
      product.price <= priceRange.max;
    
    return matchesQuery && matchesCategory && matchesPrice;
  });
}

// Get a product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}