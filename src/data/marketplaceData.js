import { Wrench, Zap, Droplet, Wind, Shield } from 'lucide-react';

export const marketplaceProducts = [
  {
    id: 'prod-1',
    name: 'AC Copper Pipe (10 Feet)',
    category: 'Cooling & AC',
    price: 1800,
    rating: 4.8,
    desc: 'High-grade insulated copper tube for split AC installation and gas line extension.',
    stock: 'In Stock',
    icon: Wind
  },
  {
    id: 'prod-2',
    name: 'AC Capacitor (30 MFD)',
    category: 'Cooling & AC',
    price: 650,
    rating: 4.9,
    desc: 'Original heavy-duty dual-run capacitor for AC compressor and fan motor protection.',
    stock: 'In Stock',
    icon: Wind
  },
  {
    id: 'prod-3',
    name: 'Smart Wi-Fi Touch Switch (2 Gang)',
    category: 'Electrical',
    price: 1200,
    rating: 4.7,
    desc: 'Glass panel smart wall switch compatible with Google Assistant and Amazon Alexa.',
    stock: 'In Stock',
    icon: Zap
  },
  {
    id: 'prod-4',
    name: 'PVC Basin Tap / Faucet',
    category: 'Plumbing',
    price: 450,
    rating: 4.6,
    desc: 'Rust-free heavy-duty plastic and chrome-plated water tap for bathroom and kitchen sinks.',
    stock: 'In Stock',
    icon: Droplet
  },
  {
    id: 'prod-5',
    name: 'Professional Tool Kit (40 Pcs)',
    category: 'Tools & Hardware',
    price: 2500,
    rating: 5.0,
    desc: 'Complete socket wrench, screwdriver, and spanner set for home DIY and repairs.',
    stock: 'Low Stock',
    icon: Wrench
  },
  {
    id: 'prod-6',
    name: 'Heavy Duty Circuit Breaker (MCB 32A)',
    category: 'Electrical',
    price: 550,
    rating: 4.8,
    desc: 'Overload and short-circuit protection miniature circuit breaker for home safety.',
    stock: 'In Stock',
    icon: Shield
  }
];