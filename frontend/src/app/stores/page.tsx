import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Stores | Aranyak Jewellers',
  description: 'Find Aranyak Jewellers showrooms near you in Tripura.',
};

const STORES = [
  { name: 'Aranyak Jewellers – Main Showroom', address: 'Battala, Agartala, Tripura 799001', phone: '+91-XXXXXXXXXX', hours: '10:00 AM – 8:00 PM' },
  { name: 'Aranyak Jewellers – City Centre', address: 'Durga Chowmuhani, Agartala, Tripura', phone: '+91-XXXXXXXXXX', hours: '10:00 AM – 8:00 PM' },
  { name: 'Aranyak Jewellers – Dharmanagar', address: 'Main Road, Dharmanagar, North Tripura', phone: '+91-XXXXXXXXXX', hours: '10:00 AM – 7:30 PM' },
  { name: 'Aranyak Jewellers – Udaipur', address: 'Bazar Road, Udaipur, Gomati, Tripura', phone: '+91-XXXXXXXXXX', hours: '10:00 AM – 7:30 PM' },
];

export default function StoresPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="py-16 burgundy-gradient text-white text-center">
        <h1 className="text-4xl font-serif font-bold mb-2">Our Showrooms</h1>
        <p className="text-xs tracking-[0.3em] uppercase text-ivory/60">Visit us across Tripura</p>
      </section>

      <section className="py-16 bg-ivory flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {STORES.map((store, i) => (
              <div key={i} className="bg-white border border-border p-8 hover:shadow-lg transition-all">
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">{store.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">📍</span> {store.address}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">📞</span> {store.phone}
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">🕐</span> {store.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
