"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

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
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-white text-primary border-2 border-primary py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  Add to Bag
                </button>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="flex-1 bg-[#25D366] text-white py-4 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Order on WhatsApp
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
