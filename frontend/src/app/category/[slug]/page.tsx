"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { api } from '@/lib/api';
import { CATEGORIES } from '@/constants/categories';
import { useParams } from 'next/navigation';

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
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-16 burgundy-gradient text-white text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">
          {category?.name || slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-xs tracking-[0.3em] uppercase text-ivory/60">{products.length} pieces</p>
      </section>

      <section className="py-12 bg-ivory flex-1">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            {category?.subcategories && (
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map(sub => (
                  <a key={sub.id} href={`/category/${slug}/${sub.slug}`}
                    className="px-3 py-1 text-xs border border-border hover:border-primary hover:text-primary transition-all uppercase tracking-wider">
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-xs border border-border px-3 py-2 bg-white">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
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
