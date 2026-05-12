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

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.pricing?.finalPrice;
  const image = product.coverImage || product.images?.[0] || '/placeholder.jpg';

  return (
    <Link 
      href={`/product/${product.slug}`}
      className="group block bg-white border border-border hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ivory">
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          {product.images?.length > 0 ? (
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="text-center p-4">
              <div className="w-20 h-20 rounded-full bg-primary/5 mx-auto flex items-center justify-center mb-2">
                <span className="text-2xl font-serif font-bold text-primary">{product.name[0]}</span>
              </div>
              <span className="text-xs text-muted-foreground">{product.category}</span>
            </div>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button className="bg-white text-primary px-6 py-2 text-xs font-bold tracking-wider uppercase hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
            Quick View
          </button>
        </div>

        {/* Purity Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-[10px] px-2 py-1 tracking-wider uppercase font-medium">
          {product.goldPurity}KT
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted-foreground">
            {product.goldWeight}g | {product.goldPurity}KT Gold
          </span>
        </div>
        {price ? (
          <p className="text-lg font-serif font-bold text-primary">
            ₹{price.toLocaleString('en-IN')}
          </p>
        ) : (
          <p className="text-sm text-secondary font-medium">Price on request</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
