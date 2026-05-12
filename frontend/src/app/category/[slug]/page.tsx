"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { api } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import { useParams } from 'next/navigation';

import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const category = CATEGORIES.find(c => c.slug === slug);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts({ category: slug });
        setProducts(Array.isArray(data) ? data : []);
      } catch { setProducts([]); }
      setLoading(false);
    };
    fetchProducts();
  }, [slug]);

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return (a.pricing?.finalPrice || 0) - (b.pricing?.finalPrice || 0);
    if (sortBy === 'price-desc') return (b.pricing?.finalPrice || 0) - (a.pricing?.finalPrice || 0);
    return 0;
  });

  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <section className="py-20 burgundy-gradient text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.png')] bg-repeat opacity-20" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-serif font-bold mb-4 tracking-tight capitalize">
            {category?.name || slug.replace(/-/g, ' ')}
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-[1px] w-8 bg-secondary" />
            <p className="text-xs tracking-[0.4em] uppercase text-ivory/80">{products.length} Exquisite Pieces</p>
            <div className="h-[1px] w-8 bg-secondary" />
          </div>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-border pb-8">
            <div className="flex flex-wrap gap-3">
              {category?.subcategories?.map(sub => (
                <Link 
                  key={sub.id} 
                  href={`/category/${slug}/${sub.slug}`}
                  className="px-5 py-2 text-[10px] font-bold border border-border hover:border-primary hover:text-primary bg-white transition-all uppercase tracking-widest shadow-sm hover:shadow-md"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="text-[10px] font-bold border border-border px-4 py-2 bg-white uppercase tracking-widest outline-none focus:border-primary transition-all cursor-pointer"
              >
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 mb-3" />
                  <div className="h-4 bg-gray-200 mb-2 w-3/4" />
                  <div className="h-3 bg-gray-200 w-1/2" />
                </div>
              ))}
            </div>
          ) : sorted.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sorted.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-24">
              <h3 className="text-lg font-serif font-bold mb-2">No Products Yet</h3>
              <p className="text-sm text-muted-foreground">New arrivals coming soon!</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
