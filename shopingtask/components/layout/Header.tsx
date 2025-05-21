'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Initialize search query from URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '');
  }, [searchParams]);
  
  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pathname !== '/') {
      router.push(`/?query=${encodeURIComponent(searchQuery)}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      
      if (searchQuery) {
        params.set('query', searchQuery);
      } else {
        params.delete('query');
      }
      
      router.push(`/?${params.toString()}`);
    }
  };
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-colors duration-300",
      isScrolled 
        ? "bg-blue-700 text-primary-foreground shadow-md" 
        : "bg-blue-900 text-primary-foreground"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold flex items-center transition-transform hover:scale-105"
          >
            LoGo
          </Link>
          
          {/* Search Bar */}
            <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center relative flex-1 max-w-md mx-6"
            >
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-md bg-primary-foreground text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80 placeholder-primary/50"
            />
            <button 
              type="submit" 
              className="absolute right-3 text-primary/70"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            </form>
          
          {/* Right Side - Cart & User */}
            <div className="flex items-center space-x-4">
            <Link href="/cart">
              <div className="relative flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                className="relative text-primary-foreground hover:text-primary-foreground/80"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
                )}
              </Button>
              </div>
            </Link>
            </div>
        </div>
        
        {/* Mobile Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="mt-3 flex md:hidden items-center relative"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 pr-10 rounded-md bg-primary-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/80 placeholder-primary/50"
          />
          <button 
            type="submit" 
            className="absolute right-3 text-primary/70"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}