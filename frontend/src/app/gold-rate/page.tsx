"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';

export default function GoldRatePage() {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await api.getGoldPrices();
        setRates(Array.isArray(data) ? data : []);
      } catch { setRates([]); }
      setLoading(false);
    };
    fetchRates();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-16 burgundy-gradient text-white text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Today&apos;s Gold Rate</h1>
        <p className="text-xs tracking-[0.3em] uppercase text-ivory/60">Updated Daily by Aranyak Jewellers</p>
      </section>

      <section className="py-16 bg-ivory flex-1">
        <div className="container mx-auto px-4 max-w-2xl">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : rates.length > 0 ? (
            <div className="space-y-4">
              {rates.map(rate => (
                <div key={rate.id} className="bg-white border border-border p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold">{rate.purity}KT Gold</h3>
                    <span className="text-xs text-muted-foreground">per 10 grams</span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-serif font-bold text-primary">
                      ₹{rate.pricePer10g.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-muted-foreground">
                      Last updated: {new Date(rate.updatedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Gold rates will be updated soon. Please check back later.</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-primary/5 border border-primary/10 text-xs text-muted-foreground text-center">
            * Prices are indicative and may vary at the time of purchase. Visit our nearest showroom for exact rates.
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
