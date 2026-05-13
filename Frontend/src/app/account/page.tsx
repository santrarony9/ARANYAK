"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      if (!token) return;
      try {
        const data = await api.getMyOrders(token);
        setOrders(Array.isArray(data) ? data : []);
      } catch { /* empty */ }
      setLoading(false);
    };

    fetchOrders();
  }, [isAuthenticated, token, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <section className="py-20 burgundy-gradient text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-serif font-bold italic">Welcome, {user.name}</h1>
              <p className="text-xs tracking-[0.4em] uppercase text-ivory/60">{user.email} • Member since {new Date().getFullYear()}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-8 py-3 border border-white/30 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-primary transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 flex-1 bg-ivory">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar / Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white p-8 border border-border shadow-sm space-y-6">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary">Profile Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Full Name</p>
                    <p className="text-sm font-medium text-primary mt-1">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-medium text-primary mt-1">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Account Type</p>
                    <p className="text-sm font-medium text-secondary mt-1 uppercase tracking-tighter">{user.role}</p>
                  </div>
                </div>
              </div>

              {user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
                <Link 
                  href="/admin"
                  className="block bg-primary text-white p-8 border border-primary shadow-xl hover:bg-secondary transition-all group"
                >
                  <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-2">Management Portal</h2>
                  <p className="text-xs text-white/70 italic">Access administration tools and analytics.</p>
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span>Enter Portal</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              ) : null}
            </div>

            {/* Orders History */}
            <div className="lg:col-span-8">
              <div className="bg-white p-8 border border-border shadow-sm h-full">
                <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary mb-8">Purchase History</h2>
                
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-24 bg-ivory animate-pulse" />
                    ))}
                  </div>
                ) : orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border p-6 hover:border-secondary transition-colors group">
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Order ID</p>
                            <p className="text-sm font-serif font-bold text-primary mt-1">#{order.id.slice(-8).toUpperCase()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Status</p>
                            <span className="inline-block mt-1 px-3 py-1 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest">
                              {order.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          {order.items?.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                              <span className="font-medium text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-6 border-t border-border">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Total Investment</p>
                            <p className="text-xl font-serif font-bold text-primary mt-1">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                          </div>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-widest">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                    <p className="text-muted-foreground italic">No purchases yet. Your treasures await.</p>
                    <Link href="/collections" className="text-[10px] font-bold tracking-widest uppercase text-primary border-b border-primary/20 pb-1">
                      Start Browsing
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
