"use client";

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: Math.random().toString(36).substr(2, 9),
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    removeFromWishlist(item.id);
  };

  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      
      <section className="py-20 burgundy-gradient text-white text-center">
        <h1 className="text-4xl font-serif font-bold mb-4">My Wishlist</h1>
        <p className="text-xs tracking-[0.4em] uppercase text-ivory/60">Your Curated Treasures</p>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/20"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <p className="font-serif text-lg text-muted-foreground">Your wishlist is currently empty.</p>
              <Link href="/collections" className="inline-block bg-primary text-white px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-secondary transition-all">
                Discover Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.id} className="group bg-white border border-border overflow-hidden hover:shadow-xl transition-all duration-500">
                  <Link href={`/product/${item.slug}`} className="block relative aspect-[4/5] bg-ivory overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </Link>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-foreground uppercase tracking-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      </button>
                    </div>
                    <p className="text-lg font-serif font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</p>
                    <button 
                      onClick={() => handleMoveToCart(item)}
                      className="w-full bg-primary text-white py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-secondary transition-all"
                    >
                      Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
