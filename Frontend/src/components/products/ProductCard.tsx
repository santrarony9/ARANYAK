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
import { useWishlist } from '@/context/WishlistContext';

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: price,
        image: image,
        slug: product.slug
      });
    }
  };

  return (
    <div className="group relative bg-white border border-border hover:shadow-[0_20px_50px_rgba(74,4,4,0.1)] transition-all duration-700 overflow-hidden silk-texture">
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
          {/* Gold Foil Inner Border (Visible on Hover) */}
          <div className="absolute inset-2 border border-secondary/0 group-hover:border-secondary/20 transition-all duration-700 z-10 pointer-events-none" />
          
          {product.images?.length > 0 ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000"
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
            <button 
              onClick={handleAddToCart}
              className="bg-primary text-white px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-secondary transition-all transform scale-90 group-hover:scale-100 duration-500 shadow-2xl luxury-shimmer"
            >
              Add to Bag
            </button>
          </div>

          {/* Purity Badge */}
          <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-md text-white text-[8px] px-3 py-1.5 tracking-[0.2em] uppercase font-bold z-30 shadow-lg">
            {product.goldPurity}KT <span className="text-secondary ml-1">GOLD</span>
          </div>

          {/* Wishlist Toggle */}
          <button 
            onClick={handleToggleWishlist}
            className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-primary hover:text-white transition-all text-primary"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill={isInWishlist(product.id) ? "currentColor" : "none"} 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-6 space-y-4 relative bg-white flex flex-col h-[180px]">
          <div className="space-y-1.5 flex-1">
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight font-serif italic h-10 overflow-hidden">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-4 bg-secondary/30" />
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] font-medium">
                {product.goldWeight}g Net WT
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-ivory mt-auto">
            {price > 0 ? (
              <p className="text-lg font-serif font-bold text-primary tracking-tight">
                ₹{price.toLocaleString('en-IN')}
              </p>
            ) : (
              <p className="text-[10px] text-secondary font-bold uppercase tracking-widest italic">Price on request</p>
            )}
            <div className="w-8 h-8 rounded-full border border-ivory flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
