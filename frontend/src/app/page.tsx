import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/constants/categories';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/hero-banner.png" 
          alt="Aranyak Jewellers Collection" 
          fill
          className="object-cover scale-105 hover:scale-100 transition-transform duration-[10s]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center space-y-6 px-4">
          <h2 className="text-secondary text-sm md:text-base font-medium tracking-[0.5em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Crafting Elegance Since 1995
          </h2>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Timeless Treasures for <br /> Every Occasion
          </h1>
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Link 
              href="/collections" 
              className="bg-secondary text-primary px-10 py-4 font-bold tracking-widest hover:bg-white transition-all uppercase text-sm"
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-2">
            <h3 className="text-primary text-3xl md:text-4xl font-serif font-bold">Shop by Category</h3>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">Discover our handpicked selections</p>
            <div className="w-24 h-[1px] bg-secondary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.id} 
                href={`/category/${cat.slug}`}
                className="group relative aspect-square bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center justify-center p-6 border border-border"
              >
                <div className="text-primary group-hover:scale-110 transition-transform duration-500 mb-4">
                  {/* Category Placeholder Icon/Image */}
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                    <span className="text-xl font-serif font-bold text-primary">{cat.name[0]}</span>
                  </div>
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center uppercase tracking-wider group-hover:text-primary">
                  {cat.name}
                </span>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-secondary transition-all" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-transparent group-hover:border-secondary transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[500px] group overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-all duration-700 z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white space-y-4">
                <h4 className="text-3xl font-serif font-bold">The Bridal Edit</h4>
                <p className="text-sm tracking-widest uppercase text-ivory/80">Make your day unforgettable</p>
                <Link href="/collections/bridal" className="border-b border-white hover:text-secondary hover:border-secondary transition-all text-xs tracking-[0.3em] uppercase pt-2 pb-1">Shop Now</Link>
              </div>
              <div className="w-full h-full bg-gray-200" /> {/* Add real images later */}
            </div>
            <div className="relative h-[500px] group overflow-hidden">
              <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/40 transition-all duration-700 z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white space-y-4">
                <h4 className="text-3xl font-serif font-bold">Modern Aura</h4>
                <p className="text-sm tracking-widest uppercase text-ivory/80">Everyday luxury for the youth</p>
                <Link href="/collections/aura" className="border-b border-white hover:text-primary hover:border-primary transition-all text-xs tracking-[0.3em] uppercase pt-2 pb-1">Shop Now</Link>
              </div>
              <div className="w-full h-full bg-gray-300" /> {/* Add real images later */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
