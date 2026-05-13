"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const CartDrawer = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, cartCount } = useCart();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsAppOrder = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '91XXXXXXXXXX';
    
    let message = `*New Order from Aranyak Jewellers Website*\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.quantity}\n`;
      message += `   Price: ₹${item.price.toLocaleString('en-IN')}\n\n`;
    });
    
    message += `*Total Amount: ₹${total.toLocaleString('en-IN')}*\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-border flex items-center justify-between bg-ivory">
          <div>
            <h2 className="text-xl font-serif font-bold text-primary tracking-tight">Shopping Bag</h2>
            <p className="text-[10px] tracking-widest uppercase text-muted-foreground">{cartCount} Items</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-primary/5 rounded-full transition-colors text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <div>
                <p className="font-serif font-bold text-lg">Your bag is empty</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Start adding some treasures!</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="bg-primary text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-secondary transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 aspect-square bg-ivory border border-border overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.name}</h3>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-serif font-bold text-primary">₹{item.price.toLocaleString('en-IN')}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[10px] text-red-600 hover:underline uppercase tracking-widest font-bold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border space-y-4 bg-ivory">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-[0.2em]">Subtotal</span>
              <span className="text-xl font-serif font-bold text-primary">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic text-center">Premium insured delivery on all orders.</p>
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-primary text-white flex items-center justify-center py-4 font-bold tracking-[0.2em] uppercase text-sm hover:bg-secondary transition-all shadow-lg"
            >
              Proceed to Checkout
            </Link>
            <div className="flex items-center gap-4 py-2">
              <div className="h-[1px] flex-1 bg-border" />
              <span className="text-[8px] text-muted-foreground uppercase tracking-widest font-bold">OR</span>
              <div className="h-[1px] flex-1 bg-border" />
            </div>
            <button 
              onClick={handleWhatsAppOrder}
              className="w-full border border-[#25D366] text-[#25D366] flex items-center justify-center space-x-3 py-3 font-bold tracking-[0.1em] uppercase text-[10px] hover:bg-[#25D366] hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>Quick Inquiry on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
