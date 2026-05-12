import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CATEGORIES } from '@/constants/categories';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Collections | Aranyak Jewellers',
  description: 'Browse all Gold, Diamond, Silver jewellery and Astrological Stones at Aranyak Jewellers, Tripura.',
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Page Hero */}
      <section className="relative py-20 burgundy-gradient text-white text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Collections</h1>
        <p className="text-sm tracking-[0.4em] uppercase text-ivory/60">
          Explore the finest jewellery crafted with passion
        </p>
        <div className="w-24 h-[1px] bg-secondary mx-auto mt-6" />
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white border border-border p-8 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10 group-hover:bg-primary/10 transition-all">
                    <span className="text-xl font-serif font-bold text-primary">{cat.name[0]}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {cat.name}
                    </h2>
                    {cat.subcategories && (
                      <span className="text-xs text-muted-foreground">{cat.subcategories.length} subcategories</span>
                    )}
                  </div>
                </div>

                {cat.subcategories ? (
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${cat.slug}/${sub.slug}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors py-1 border-b border-transparent hover:border-primary/20"
                      >
                        → {sub.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mb-6">Explore our curated selection</p>
                )}

                <Link
                  href={`/category/${cat.slug}`}
                  className="inline-block text-xs tracking-[0.3em] uppercase text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-all"
                >
                  View All
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
