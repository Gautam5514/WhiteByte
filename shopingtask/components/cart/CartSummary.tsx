import { CartItem } from '@/types';

export default function CartSummary({ cart }: { cart: CartItem[] }) {
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Calculate tax (assume 8% tax rate)
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  
  // Calculate shipping (free over $50, otherwise $5.99)
  const shippingThreshold = 50;
  const standardShipping = 5.99;
  const shipping = subtotal > shippingThreshold ? 0 : standardShipping;
  
  // Calculate total
  const total = subtotal + tax + shipping;
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        {shipping === 0 && (
          <div className="text-xs text-green-600 italic">
            Free shipping on orders over ${shippingThreshold.toFixed(2)}
          </div>
        )}
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}