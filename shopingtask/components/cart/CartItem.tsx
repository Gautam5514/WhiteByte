import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/types';
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function CartItem({ 
  item, 
  removeFromCart, 
  updateQuantity 
}: CartItemProps) {
  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-card rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="relative w-full sm:w-24 h-24 bg-muted/30 rounded overflow-hidden flex-shrink-0">
        <Link href={`/product/${item.id}`}>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 96px"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-grow">
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        
        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-sm text-muted-foreground">
            Unit Price: <span className="font-medium text-foreground">${item.price.toFixed(2)}</span>
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center h-8 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <div className="h-8 w-10 flex items-center justify-center border-y border-input">
              {item.quantity}
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Price and Remove */}
      <div className="flex flex-col items-end gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
        <div className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 h-8 px-2"
          onClick={handleRemove}
        >
          <Trash className="h-4 w-4 mr-1" />
          Remove
        </Button>
      </div>
    </div>
  );
}