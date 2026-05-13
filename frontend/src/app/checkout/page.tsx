"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart, cartCount } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=checkout');
    }
  }, [isAuthenticated, router]);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    setError('');

    try {
      const data = await api.createOrder(token, shippingAddress, cart, total);
      if (data.id) {
        setSuccess(true);
        clearCart();
      } else {
        setError(data.message || 'Failed to place order');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <Header />
        <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 space-y-8 text-center">
          <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-secondary"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold text-primary italic">Order Placed Successfully</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your treasures are being prepared. You will receive an update shortly regarding the verification and shipping of your order.
            </p>
          </div>
          <Link 
            href="/account" 
            className="bg-primary text-white px-12 py-4 font-bold text-xs tracking-[0.3em] uppercase hover:bg-secondary transition-all"
          >
            Track My Order
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  if (cartCount === 0) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <p className="font-serif text-2xl mb-8">Your bag is empty.</p>
          <Link href="/collections" className="bg-primary text-white px-10 py-4 text-xs font-bold tracking-widest uppercase">
            Browse Collections
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-ivory">
      <Header />
      
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-serif font-bold text-primary mb-12 text-center italic">Finalize Your Acquisition</h1>
          
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 border border-border shadow-sm">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary mb-8">Shipping Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">Street Address</label>
                    <input 
                      type="text" 
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleChange}
                      required
                      className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleChange}
                        required
                        className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">State</label>
                      <input 
                        type="text" 
                        name="state"
                        value={shippingAddress.state}
                        onChange={handleChange}
                        required
                        className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">Pincode</label>
                      <input 
                        type="text" 
                        name="zip"
                        value={shippingAddress.zip}
                        onChange={handleChange}
                        required
                        className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-primary ml-1">Contact Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={shippingAddress.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-ivory border border-border px-4 py-3 text-sm outline-none focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 bg-red-50 p-3 text-center">{error}</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary text-white py-5 font-bold text-xs tracking-[0.3em] uppercase hover:bg-secondary transition-all shadow-xl disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Complete Purchase'}
                  </button>
                </form>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 border border-border shadow-sm sticky top-32">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary mb-8">Order Summary</h2>
                
                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-ivory border border-border overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-xs font-medium text-foreground line-clamp-1 uppercase tracking-tight">{item.name}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">Qty: {item.quantity}</p>
                      </div>
                      <div className="flex flex-col justify-center text-right">
                        <p className="text-xs font-serif font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-6 space-y-4">
                  <div className="flex justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-secondary font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-sm font-bold text-primary uppercase tracking-[0.2em]">Grand Total</span>
                    <span className="text-2xl font-serif font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-secondary/5 border border-secondary/10 flex items-start gap-3">
                  <div className="text-secondary text-lg mt-0.5">✦</div>
                  <p className="text-[10px] text-primary/70 leading-relaxed italic">
                    Aranyak Promise: Secure insured delivery and lifetime exchange on all items.
                  </p>
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
