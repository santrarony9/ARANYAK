import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-serif font-bold text-secondary tracking-widest uppercase">
                Aranyak
              </span>
              <span className="text-xs tracking-[0.4em] text-ivory/80 uppercase font-medium">
                Jewellers
              </span>
            </Link>
            <p className="text-sm text-ivory/60 leading-relaxed">
              Exquisite craftsmanship and timeless designs. Aranyak Jewellers brings you the finest gold, diamond, and silver jewellery in Tripura.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/collections" className="hover:text-secondary transition-colors">Our Collections</Link></li>
              <li><Link href="/stores" className="hover:text-secondary transition-colors">Store Locator</Link></li>
              <li><Link href="/gold-rate" className="hover:text-secondary transition-colors">Live Gold Rate</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Customer Service</h4>
            <ul className="space-y-4 text-sm text-ivory/70">
              <li><Link href="/shipping" className="hover:text-secondary transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-secondary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/certificate" className="hover:text-secondary transition-colors">Certificate Verification</Link></li>
              <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold text-secondary mb-6">Stay Connected</h4>
            <p className="text-sm text-ivory/60 mb-4">Subscribe to receive updates on new collections and exclusive offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email"
                className="bg-ivory/10 border border-ivory/20 px-4 py-2 text-sm w-full focus:outline-none focus:border-secondary transition-colors"
              />
              <button className="bg-secondary text-primary px-6 py-2 text-sm font-bold hover:bg-white transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-ivory/40 uppercase tracking-widest">
          <p>© 2024 Aranyak Jewellers. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-ivory/70">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ivory/70">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
