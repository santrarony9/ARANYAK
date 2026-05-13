"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      name: product.name,
      price: product.pricing?.finalPrice || 0,
      quantity: 1,
      image: product.coverImage || product.images?.[0] || '/placeholder.jpg'
    });
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX';
    const message = `*Inquiry about ${product.name}*\n\nPrice: ₹${product.pricing?.finalPrice.toLocaleString('en-IN')}\nLink: ${window.location.href}\n\nI would like to purchase this item.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

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
    <main className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="text-[10px] text-muted-foreground mb-12 tracking-[0.2em] uppercase reveal">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-3 opacity-30">/</span>
            <Link href={`/category/${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
            <span className="mx-3 opacity-30">/</span>
            <span className="text-primary font-bold">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
            {/* Gallery Section */}
            <div className="lg:col-span-7 space-y-6 reveal">
              <div className="relative aspect-square bg-ivory overflow-hidden gold-foil-border">
                {images[selectedImage] ? (
                  <img 
                    src={images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-serif text-primary/10">{product.name[0]}</span>
                  </div>
                )}
                
                {/* Purity Badge overlay */}
                <div className="absolute top-6 left-6 bg-primary/90 backdrop-blur-md text-white text-[9px] px-4 py-2 tracking-[0.2em] uppercase font-bold z-10">
                  {product.goldPurity}KT Pure Gold
                </div>
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-4">
                  {images.map((img: string, i: number) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-24 h-24 overflow-hidden transition-all duration-300 ${i === selectedImage ? 'ring-2 ring-secondary ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="lg:col-span-5 space-y-10 reveal delay-200">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-secondary font-bold">{product.category}</span>
                  <div className="h-[1px] w-8 bg-secondary/30" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{product.sku || 'AR-0012'}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">{product.name}</h1>
                <p className="text-3xl font-serif text-foreground">
                  ₹{pricing.finalPrice.toLocaleString('en-IN')}
                </p>
              </div>

              {product.description && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">The Story</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic font-light">
                    "{product.description}"
                  </p>
                </div>
              )}

              {/* Price Breakdown - Refined */}
              <div className="border-y border-border py-8 space-y-6">
                <div className="flex justify-between items-center group cursor-pointer">
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Technical Specifications</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                  <div className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-muted-foreground">Purity</span>
                    <span className="font-medium text-primary">{product.goldPurity}KT</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-muted-foreground">Net Weight</span>
                    <span className="font-medium text-primary">{product.goldWeight}g</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-muted-foreground">Making Charges</span>
                    <span className="font-medium text-primary">₹{pricing.components.makingCharges.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between border-b border-ivory pb-2">
                    <span className="text-muted-foreground">GST (3%)</span>
                    <span className="font-medium text-primary">₹{pricing.components.gst.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="space-y-4 pt-4">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-primary text-white py-5 font-bold text-[11px] tracking-[0.3em] uppercase hover:bg-secondary transition-all flex items-center justify-center gap-3 shadow-xl group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Inquiry on WhatsApp
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-white text-primary border border-primary/20 py-5 font-bold text-[11px] tracking-[0.3em] uppercase hover:border-primary transition-all"
                >
                  Add to Shopping Bag
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center space-y-2">
                  <div className="text-secondary text-lg">✦</div>
                  <p className="text-[8px] tracking-widest uppercase text-muted-foreground font-bold">Authentic</p>
                </div>
                <div className="text-center space-y-2 border-x border-border">
                  <div className="text-secondary text-lg">✦</div>
                  <p className="text-[8px] tracking-widest uppercase text-muted-foreground font-bold">BIS Hallmark</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-secondary text-lg">✦</div>
                  <p className="text-[8px] tracking-widest uppercase text-muted-foreground font-bold">Secure Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
