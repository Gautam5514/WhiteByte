'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CATEGORIES } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { FilterX } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Get current filter values from URL
  const currentCategory = searchParams.get('category') || '';
  const currentMinPrice = Number(searchParams.get('minPrice') || '0');
  const currentMaxPrice = Number(searchParams.get('maxPrice') || '5000');
  
  // Local state for filters
  const [category, setCategory] = useState(currentCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentMinPrice,
    currentMaxPrice
  ]);
  
  // Update local state when URL params change
  useEffect(() => {
    setCategory(currentCategory);
    setPriceRange([
      Number(searchParams.get('minPrice') || '0'),
      Number(searchParams.get('maxPrice') || '5000')
    ]);
  }, [searchParams, currentCategory, currentMinPrice, currentMaxPrice]);
  
  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update category filter
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    
    // Update price range
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    // Keep search query if exists
    const query = searchParams.get('query');
    if (query) {
      params.set('query', query);
    }
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setCategory('');
    setPriceRange([0, 5000]);
    router.push(pathname);
  };
  
  // Check if any filters are applied
  const filtersApplied = category !== '' || priceRange[0] > 0 || priceRange[1] < 5000;
  
  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {filtersApplied && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="text-xs"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={['category', 'price']} className="space-y-4">
        <AccordionItem value="category" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="category-all" 
                  checked={category === ''}
                  onCheckedChange={() => setCategory('')}
                />
                <Label 
                  htmlFor="category-all" 
                  className="text-sm cursor-pointer"
                >
                  All
                </Label>
              </div>
              
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${cat}`}
                    checked={category === cat}
                    onCheckedChange={() => setCategory(cat)}
                  />
                  <Label 
                    htmlFor={`category-${cat}`} 
                    className="text-sm capitalize cursor-pointer"
                  >
                    {cat}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="price" className="border-b-0">
          <AccordionTrigger className="py-2 text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[0, 5000]}
                value={priceRange}
                min={0}
                max={5000}
                step={50}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="mb-6"
              />
              <div className="flex items-center justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button 
        onClick={applyFilters} 
        className="w-full mt-4"
      >
        Apply Filters
      </Button>
    </div>
  );
}