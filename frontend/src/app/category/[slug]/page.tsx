"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { api } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import { useParams } from 'next/navigation';

import Link from 'next/link';
import { Reveal, FadeIn } from '@/components/animations/Reveal';
import EmptyState from '@/components/ui/EmptyState';

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
    <FadeIn>
      <main className="min-h-screen flex flex-col bg-white">
      <Header />
      <section className="py-24 burgundy-gradient text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat" />
        <div className="relative z-10">
          <Reveal>
            <h1 className="text-6xl font-serif font-bold mb-6 tracking-tight capitalize">
              {category?.name || slug.replace(/-/g, ' ')}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex items-center justify-center space-x-6">
              <div className="h-[1px] w-12 bg-secondary/50" />
              <p className="text-xs tracking-[0.5em] uppercase text-ivory/80">{products.length} Masterpieces</p>
              <div className="h-[1px] w-12 bg-secondary/50" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-8">
              <div className="flex flex-wrap gap-4">
                {category?.subcategories?.map(sub => (
                  <Link 
                    key={sub.id} 
                    href={`/category/${slug}/${sub.slug}`}
                    className="px-8 py-3 text-[10px] font-bold border border-border hover:border-primary hover:text-primary bg-white transition-all uppercase tracking-widest hover:shadow-xl group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {sub.name}
                  </Link>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 border-l border-border pl-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Arrange By</span>
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value)}
                  className="text-[10px] font-bold border-none bg-transparent uppercase tracking-widest outline-none cursor-pointer text-primary"
                >
                  <option value="newest">Latest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[4/5] bg-ivory" />
                  <div className="h-4 bg-ivory w-3/4" />
                  <div className="h-4 bg-ivory w-1/2" />
                </div>
              ))}
            </div>
          ) : sorted.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {sorted.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState 
              title="A Collection in Making"
              description="Our artisans are currently handcrafting the next generation of masterpieces for this collection. Please check back shortly."
              icon={<span className="text-4xl text-primary/20">✧</span>}
              actionText="Explore Other Collections"
              actionHref="/collections"
            />
          )}
        </div>
      </section>
      <Footer />
    </FadeIn>
  );
}
