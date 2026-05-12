"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.getProduct(slug);
        setProduct(data);
      } catch { /* empty */ }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen"><Header />
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-100 w-1/2 animate-pulse" />
              <div className="h-10 bg-gray-100 w-1/3 animate-pulse mt-6" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen"><Header />
        <div className="text-center py-32">
          <h1 className="text-2xl font-serif font-bold">Product Not Found</h1>
        </div>
        <Footer />
      </main>
    );
  }

  const pricing = product.pricing;
  const images = product.images?.length > 0 ? product.images : [null];

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-8 tracking-wider uppercase">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <a href={`/category/${product.category}`} className="hover:text-primary">{product.category}</a>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-ivory border border-border overflow-hidden">
                {images[selectedImage] ? (
                  <img src={images[selectedImage]} alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl font-serif text-primary/20">{product.name[0]}</span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img: string, i: number) => (
                    <button key={i} onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 border-2 overflow-hidden ${i === selectedImage ? 'border-primary' : 'border-border'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-secondary font-medium">{product.category}</span>
                <h1 className="text-3xl font-serif font-bold text-foreground mt-2">{product.name}</h1>
              </div>

              {pricing && (
                <div className="space-y-4">
                  <p className="text-3xl font-serif font-bold text-primary">
                    ₹{pricing.finalPrice.toLocaleString('en-IN')}
                  </p>

                  {/* Price Breakdown */}
                  <div className="bg-ivory p-5 border border-border space-y-3 text-sm">
                    <h4 className="font-bold text-xs tracking-wider uppercase text-muted-foreground">Price Breakdown</h4>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gold Value ({product.goldWeight}g × {product.goldPurity}KT)</span>
                      <span>₹{pricing.components.goldValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Making Charges</span>
                      <span>₹{pricing.components.makingCharges.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (3%)</span>
                      <span>₹{pricing.components.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{pricing.finalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-ivory p-3 border border-border">
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Purity</span>
                  <span className="font-bold">{product.goldPurity}KT Gold</span>
                </div>
                <div className="bg-ivory p-3 border border-border">
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">Weight</span>
                  <span className="font-bold">{product.goldWeight} grams</span>
                </div>
              </div>

              {product.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              )}

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-primary text-white py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-all">
                  Add to Cart
                </button>
                <button className="w-14 h-14 border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${product.stockCount > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-muted-foreground">
                  {product.stockCount > 0 ? `In Stock (${product.stockCount} available)` : 'Made to Order'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
