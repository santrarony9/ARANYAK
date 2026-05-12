import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
    coverImage?: string;
    goldPurity: number;
    goldWeight: number;
    category: string;
    pricing?: {
      finalPrice: number;
      components: {
        goldValue: number;
        makingCharges: number;
        gst: number;
      };
    };
  };
}

import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const price = product.pricing?.finalPrice || 0;
  const image = product.coverImage || product.images?.[0] || '/placeholder.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: price,
      quantity: 1,
      image: image
    });
  };

  return (
    <div className="group relative bg-white border border-border hover:shadow-[0_20px_50px_rgba(74,4,4,0.1)] transition-all duration-500 overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
          {product.images?.length > 0 ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                <span className="text-2xl font-serif font-bold text-primary">{product.name[0]}</span>
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</span>
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
            <button 
              onClick={handleAddToCart}
              className="bg-white text-primary px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl"
            >
              Add to Bag
            </button>
          </div>

          {/* Purity Badge */}
          <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[9px] px-3 py-1.5 tracking-[0.2em] uppercase font-bold">
            {product.goldPurity}KT GOLD
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 uppercase tracking-tight">
              {product.name}
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              {product.goldWeight}g Weight
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            {price > 0 ? (
              <p className="text-base font-serif font-bold text-primary">
                ₹{price.toLocaleString('en-IN')}
              </p>
            ) : (
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest italic">Price on request</p>
            )}
            <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
