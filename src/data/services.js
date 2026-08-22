import { Zap, Wrench, Wind, Droplets, Hammer, Paintbrush, Monitor, Droplet } from 'lucide-react';

export const services = [
  { 
    id: '1', 
    name: 'Electrician & Wiring', 
    category: 'Electrical',
    icon: Zap, 
    price: 500, 
    desc: 'Expert solutions for fan installation, light fixtures, switchboard repair, and complete home wiring.',
    features: ['NID Verified Electrician', '7-Day Warranty', 'Safe Spark Testing']
  },
  { 
    id: '2', 
    name: 'Plumbing & Sanitary', 
    category: 'Plumbing',
    icon: Droplets, 
    price: 600, 
    desc: 'Leakage fixing, pipe fitting, sanitary installation, and water tap maintenance.',
    features: ['No Mess Guarantee', 'Experienced Plumber', 'Quality Spare Parts']
  },
  { 
    id: '3', 
    name: 'AC Repair & Servicing', 
    category: 'Cooling',
    icon: Wind, 
    price: 1200, 
    desc: 'General servicing, chemical wash, gas refilling, and compressor troubleshooting for all split/window ACs.',
    features: ['Jet Pressure Wash', 'Gas Leak Check', 'Expert Technicians']
  },
  { 
    id: '4', 
    name: 'Home Deep Cleaning', 
    category: 'Cleaning',
    icon: Wrench, 
    price: 800, 
    desc: 'Comprehensive cleaning for bedrooms, bathrooms, kitchen, sofa, and floor polishing.',
    features: ['Eco-friendly Chemicals', 'Deep Sanitization', 'Professional Equipment']
  },
  { 
    id: '5', 
    name: 'Carpenter & Furniture', 
    category: 'Woodwork',
    icon: Hammer, 
    price: 700, 
    desc: 'Custom furniture assembly, door lock repair, bed fixing, and cabinet alignment.',
    features: ['Precision Tools', 'Skilled Carpenters', 'Quick Repair']
  },
  { 
    id: '6', 
    name: 'Interior & Exterior Painting', 
    category: 'Painting',
    icon: Paintbrush, 
    price: 2000, 
    desc: 'Professional wall painting, damp-proofing, putty work, and decorative texture finish.',
    features: ['Free Estimation', 'Premium Paints', 'Clean Finish']
  },
  { 
    id: '7', 
    name: 'CCTV Camera Setup', 
    category: 'Security',
    icon: Monitor, 
    price: 1500, 
    desc: 'IP camera installation, DVR/NVR configuration, wiring, and mobile app integration.',
    features: ['Secure Setup', 'Night Vision Config', 'Remote Access Support']
  },
  { 
    id: '8', 
    name: 'Water Filter Servicing', 
    category: 'Appliances',
    icon: Droplet, 
    price: 400, 
    desc: 'RO/UV water purifier maintenance, cartridge replacement, and TDS testing.',
    features: ['TDS Level Check', 'Genuine Cartridges', 'Pure Water Guarantee']
  },
];