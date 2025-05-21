'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  TagIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);

    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart.`,
      duration: 2000,
    });
  };

  const images: string[] = (product.gallery && product.gallery.length > 0)
  ? product.gallery
  : [product.image];


  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-lg overflow-hidden bg-muted/30 border"
          >
            <Image
              src={images[activeImage]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "relative aspect-square rounded border cursor-pointer overflow-hidden transition-all duration-200",
                    activeImage === idx ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setActiveImage(idx)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>

            {product.rating && (
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < (product.rating ?? 0)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl md:text-3xl font-semibold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.originalPrice && (
              <div className="mt-1">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-muted-foreground">
              {product.description || "No description available for this product."}
            </p>
          </div>

          {/* Category */}
          {product.category && (
            <div className="flex items-center">
              <TagIcon className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground capitalize">
                Category: <span className="font-medium text-foreground">{product.category}</span>
              </span>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h2 className="text-lg font-medium mb-3">Quantity</h2>
            <div className="flex items-center h-10">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-r-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-10 px-4 flex items-center justify-center border-y border-input min-w-[3rem]">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="h-10 w-10 rounded-l-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={added}
              className="w-full h-12 text-base"
              size="lg"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.div
                    key="added"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Added to Cart
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {/* Additional details */}
          <div className="border-t pt-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {product.specifications && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Specifications</h3>
                  <div className="text-sm space-y-1">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product recommendations section */}
      {product.relatedProducts && product.relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-card rounded-lg p-4 shadow-sm">
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="relative aspect-square mb-3">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">{relatedProduct.name}</h3>
                  <p className="mt-1 font-semibold">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}