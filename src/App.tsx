/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, Mail, Info, Home, ChevronLeft, ChevronRight, Instagram, Facebook, Twitter } from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Products', href: '#products', icon: ShoppingBag },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-sm italic">T</div>
          TECH <span className="text-indigo-400">CHAYAH</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase hover:bg-indigo-500 transition-all transform hover:scale-105 active:scale-95">
            SHOP NOW
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t-0 rounded-b-3xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-medium"
                >
                  <link.icon size={20} className="text-pink-500" />
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      label: "New Arrival 2026",
      title: "CYBERNETIC ELEGANCE",
      subtitle: "Merging algorithmic precision with haute couture. Explore wearable art.",
      image: "https://images.unsplash.com/photo-1539109132304-3912446184af?auto=format&fit=crop&w=1920&q=80",
    },
    {
      label: "Summer 26",
      title: "ALGORITHMIC CHIC",
      subtitle: "Vibrant colors meet breathable tech fabrics for the digital nomad.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
    },
    {
      label: "Limited Drop",
      title: "TECH-CHIC VELVET",
      subtitle: "Stand out with our smart-luminous accessories and high-thread velvet.",
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1920&q=80",
    }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-full w-full overflow-hidden bento-card border-none rounded-none md:rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-zinc-950/40" />
          
          <div className="relative h-full flex flex-col items-center justify-center text-center px-12">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-indigo-600 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest mb-4 inline-block"
            >
              {slides[current].label}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-none mb-6 tracking-tighter"
            >
              {slides[current].title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-400 text-sm max-w-md mx-auto mb-10"
            >
              {slides[current].subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <button className="bg-white text-zinc-950 px-8 py-3 rounded-full font-black text-xs uppercase tracking-tighter hover:bg-zinc-200 transition-all">
                SHOP COLLECTION
              </button>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Controls (Minimal) */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        <button onClick={prev} className="p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white hover:text-black transition-all">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="p-3 bg-white/10 backdrop-blur rounded-full hover:bg-white hover:text-black transition-all">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-zinc-100 group relative overflow-hidden rounded-2xl p-4 flex flex-col justify-between h-56"
    >
      <div className="w-full h-28 bg-zinc-200 rounded-lg overflow-hidden mb-3">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
           <button className="bg-indigo-600 text-white p-2 rounded-full shadow-lg">
             <ShoppingBag size={14} />
           </button>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</p>
        <p className="text-sm font-black truncate text-zinc-950 uppercase tracking-tighter">{product.name}</p>
        <p className="text-xs font-mono text-indigo-600 font-bold">{product.price}</p>
      </div>
    </motion.div>
  );
};

const ProductsSection = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Neon Matrix Gown",
      price: "$840.00",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      category: "Dress"
    },
    {
      id: 2,
      name: "Circuitry Blazer",
      price: "$1,200.00",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
      category: "Suit"
    },
    {
      id: 3,
      name: "Hologram Clutch",
      price: "$450.00",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
      category: "Accessory"
    },
    {
      id: 4,
      name: "Alloy Mesh Vest",
      price: "$690.00",
      image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
      category: "Tech-wear"
    }
  ];

  return (
    <section id="products" className="h-full w-full bg-white rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 overflow-hidden">
      <div className="flex-shrink-0 md:w-48">
        <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.8] text-zinc-950">
          Curated<br/><span className="text-indigo-600">Picks</span>
        </h3>
        <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mt-4 leading-normal">Selected algorithmic styles for the season.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full h-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="h-full w-full bg-indigo-600 p-8 flex flex-col justify-between rounded-3xl group">
      <div>
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 leading-none">Our Philosophy</h3>
        <p className="text-indigo-100 text-sm leading-relaxed">
          Tech Chayah isn't just a label; it's a movement. We utilize recycled tech polymers and bioluminescent fabrics to redefine luxury for the digital age.
        </p>
      </div>
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
           <div className="text-center">
             <div className="text-2xl font-black">12k</div>
             <div className="text-[8px] uppercase font-bold text-indigo-200">Global Fans</div>
           </div>
           <div className="text-center">
             <div className="text-2xl font-black">98%</div>
             <div className="text-[8px] uppercase font-bold text-indigo-200">Sustainable</div>
           </div>
        </div>
        <motion.div 
          whileHover={{ rotate: 90 }}
          className="w-12 h-12 rounded-full border border-indigo-300 flex items-center justify-center rotate-45 text-2xl cursor-pointer"
        >
          →
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="h-full w-full bento-card p-8 flex flex-col justify-center gap-6">
      <div>
        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Visit the Hub</h3>
        <p className="text-xl font-black tracking-tighter uppercase leading-none">244 Fashion District, NY</p>
        <p className="text-zinc-500 text-xs font-medium mt-1">contact@techchayah.com</p>
      </div>
      
      <div className="space-y-4">
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '70%' }}
            className="h-full bg-indigo-500"
          />
        </div>
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-zinc-500">
           <span>Service Capacity</span>
           <span className="text-indigo-400">70%</span>
        </div>
      </div>

      <button className="w-full bg-zinc-800 hover:bg-indigo-600 text-white py-3 rounded-xl text-[10px] uppercase font-black tracking-widest transition-all">
        Message Concierge
      </button>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="mt-8 py-10 px-6 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-zinc-500 uppercase tracking-widest font-black">
        <div>© 2026 Tech Chayah Design Labs</div>
        <div className="flex gap-8">
           <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
           <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
           <span className="hover:text-white cursor-pointer transition-colors">ArtStation</span>
        </div>
        <div className="flex items-center gap-2 text-indigo-400">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          Global Shipping Available
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-indigo-500 flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-6 max-w-7xl mx-auto w-full">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 md:grid-rows-6 md:h-[calc(100vh-200px)] min-h-[800px] gap-4">
          
          {/* Home / Hero Section (col 8, row 4) */}
          <div className="col-span-12 md:col-span-8 md:row-span-4 h-[400px] md:h-auto">
            <HeroSlider />
          </div>

          {/* About Section (col 4, row 2) */}
          <div className="col-span-12 md:col-span-4 md:row-span-2">
            <AboutSection />
          </div>

          {/* Contact Section (col 4, row 2) */}
          <div className="col-span-12 md:col-span-4 md:row-span-2">
            <ContactSection />
          </div>

          {/* Products Section (col 12, row 2) */}
          <div className="col-span-12 md:row-span-2 overflow-hidden">
            <ProductsSection />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
