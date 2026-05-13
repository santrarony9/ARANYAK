"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/constants/categories';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-2xl font-serif font-bold gold-gradient tracking-widest uppercase">
            Aranyak
          </span>
          <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-medium">
            Jewellers
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="relative group py-4"
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link 
                href={`/category/${cat.slug}`}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider"
              >
                {cat.name}
              </Link>

              {/* Mega Menu */}
              {cat.subcategories && (
                <div className={`absolute top-full left-0 w-64 glass p-4 shadow-xl border border-white/20 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0`}>
                  <div className="grid grid-cols-1 gap-2">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="text-xs text-muted-foreground hover:text-primary hover:translate-x-1 transition-all py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <Link href="/account" className="text-foreground hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <button className="text-foreground hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <Link href="/wishlist" className="relative text-foreground hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span className="absolute -top-2 -right-2 bg-secondary text-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground hover:text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
