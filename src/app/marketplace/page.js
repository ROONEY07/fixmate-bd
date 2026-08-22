"use client";
import { useState } from 'react';
import { marketplaceProducts } from '@/data/marketplaceData';
import { formatPrice } from '@/utils/formatPrice';
import { ShoppingBag, Search, Star, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Cooling & AC', 'Electrical', 'Plumbing', 'Tools & Hardware'];

  // ফিল্টারিং লজিক
  const filteredProducts = marketplaceProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // পার্টস বা টুলস অর্ডার করার ফাংশন (localStorage ব্যবহার করে)
  const handleBuyProduct = (product) => {
    const orderItem = {
      id: 'order-' + Date.now(),
      itemName: product.name,
      price: product.price,
      category: product.category,
      type: 'Marketplace Purchase',
      status: 'Order Placed',
      date: new Date().toLocaleDateString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('fixmate_market_orders') || '[]');
    existingOrders.push(orderItem);
    localStorage.setItem('fixmate_market_orders', JSON.stringify(existingOrders));

    alert(`Successfully ordered "${product.name}"! It will be delivered with your service or separately.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
            INTEGRATED SPARE PARTS & TOOLS STORE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            FixMate-BD Hardware Marketplace
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            No more searching local shops! Buy genuine spare parts, tools, and accessories directly with your service.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts, tools, AC pipes, switches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:border-emerald-500 shadow-sm text-slate-800 transition-all"
            />
          </div>
        </div>

        {/* Layout: Sidebar Categories & Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-28">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Product Categories
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => {
                  const Icon = product.icon;
                  return (
                    <div key={product.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                            <Icon className="h-6 w-6 text-emerald-600" />
                          </div>
                          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-xl">
                            {product.stock}
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 mb-1">{product.name}</h3>
                        <span className="text-xs text-slate-400 font-semibold uppercase block mb-3">{product.category}</span>
                        <p className="text-slate-500 text-xs mb-4 leading-relaxed line-clamp-2">{product.desc}</p>

                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 mb-4">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span>{product.rating} / 5.0 Rating</span>
                        </div>
                      </div>

                      {/* Price & Buy Button */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Price</span>
                          <span className="text-lg font-extrabold text-emerald-600">{formatPrice(product.price)}</span>
                        </div>
                        <button
                          onClick={() => handleBuyProduct(product)}
                          className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Buy Part
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-800 mb-1">No Products Found</h3>
                <p className="text-slate-500 text-sm">Try searching with a different keyword.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}