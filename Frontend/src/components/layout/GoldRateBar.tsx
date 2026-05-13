"use client";

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

const GoldRateBar = () => {
  const [rates, setRates] = useState<any[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await api.getGoldPrices();
        setRates(data);
      } catch (error) {
        console.error('Failed to fetch gold rates:', error);
      }
    };
    fetchRates();
  }, []);

  if (rates.length === 0) return null;

  return (
    <div className="bg-primary text-white py-2 overflow-hidden border-b border-secondary/20">
      <div className="flex whitespace-nowrap animate-marquee items-center space-x-12">
        {/* Repeat the content twice for smooth infinite scroll */}
        {[1, 2].map((i) => (
          <div key={i} className="flex space-x-12 shrink-0">
            {rates.map((rate) => (
              <div key={rate.id} className="flex items-center space-x-3">
                <span className="text-[10px] tracking-widest uppercase font-bold text-secondary">
                  {rate.purity}K GOLD
                </span>
                <span className="text-sm font-medium">
                  ₹{rate.pricePer10g.toLocaleString()}/10g
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              </div>
            ))}
            <div className="flex items-center space-x-3 italic text-xs text-ivory/60">
              Live Market Rates | Updated Daily
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoldRateBar;
