import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'FixMate BD | Trusted Home Services in Bangladesh',
  description: 'Book verified technicians for AC repair, plumbing, electrical works, and more in Dhaka.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                <span className="bg-emerald-500 w-3 h-3 rounded-full"></span> FixMate BD
              </h3>
              <p className="text-sm text-slate-400">Trusted, transparent, and technology-driven home services for Bangladesh.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="/services" className="hover:text-white transition">Services</a></li>
                <li><a href="/marketplace" className="hover:text-white transition">Marketplace</a></li>
                <li><a href="/tracking" className="hover:text-white transition">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Top Services</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Electrician & Wiring</li>
                <li>Plumbing & Sanitary</li>
                <li>AC Repair & Servicing</li>
                <li>Home Deep Cleaning</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <p className="text-sm text-slate-400 mb-2">Gulshan-2, Dhaka, Bangladesh</p>
              <p className="text-sm text-emerald-400 font-medium">Support: 09612-XXXXXX</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} FixMate Bangladesh. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}