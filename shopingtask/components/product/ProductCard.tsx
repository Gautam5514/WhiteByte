'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
          <div className="relative pt-[100%] bg-muted/30">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
          
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="font-medium text-base mb-1 line-clamp-2">
                {product.name}
              </h3>
              
              {product.rating && (
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5", 
                        i < product.rating 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviewCount || 0})
                  </span>
                </div>
              )}
              
              <div className="space-y-1 mb-3">
                <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}