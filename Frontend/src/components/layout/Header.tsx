"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/constants/categories';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary p-2 hover:bg-ivory rounded-full transition-all"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
          <span className="text-xl md:text-2xl font-serif font-bold gold-gradient tracking-widest uppercase">
            Aranyak
          </span>
          <span className="text-[8px] md:text-[10px] tracking-[0.3em] text-primary uppercase font-medium">
            Jewellers
          </span>
        </Link>

        {/* Navigation - Centered (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-12">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.id}
              className="relative group py-4"
              onMouseEnter={() => setActiveCategory(cat.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link 
                href={`/category/${cat.slug}`}
                className="text-xs font-bold text-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
              >
                {cat.name}
              </Link>

              {/* Mega Menu */}
              {cat.subcategories && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 glass p-6 shadow-2xl border border-white/20 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-4 group-hover:translate-y-0 z-[100]">
                  <div className="grid grid-cols-1 gap-4">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="text-[10px] font-bold text-muted-foreground hover:text-primary hover:translate-x-2 transition-all py-1 uppercase tracking-widest border-b border-ivory/50 pb-2"
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

        {/* Actions - Right Aligned */}
        <div className="flex items-center space-x-4 md:space-x-8 min-w-[100px] md:min-w-[150px] justify-end">
          <Link href="/account" className="text-foreground hover:text-primary transition-all hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative text-foreground hover:text-primary transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-white z-[90] animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full bg-ivory/30 p-8 space-y-8 overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="space-y-4">
                <Link 
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif font-bold text-primary flex items-center justify-between group"
                >
                  <span>{cat.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
                {cat.subcategories && (
                  <div className="grid grid-cols-2 gap-4 pl-4 border-l border-secondary/20">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-widest"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-8 border-t border-border space-y-4">
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span className="text-xs font-bold uppercase tracking-widest">My Wishlist ({wishlistCount})</span>
              </Link>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="text-xs font-bold uppercase tracking-widest">My Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
