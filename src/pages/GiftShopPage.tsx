import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { 
  ShoppingBag, Star, Heart, Plus, Minus, 
  Trash2, CreditCard, CheckCircle2, ShieldCheck, X, Filter 
} from 'lucide-react';

export const GiftShopPage: React.FC = () => {
  const { products, cart, addToCart, removeFromCart, clearCart, createOrder, addToast, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  // Checkout form
  const [shippingName, setShippingName] = useState('Ahmed Mansoor');
  const [shippingAddress, setShippingAddress] = useState('Palm Jumeirah Villa 42, Dubai, UAE');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-10');
  const [giftNote, setGiftNote] = useState('Happy Anniversary My Love! ❤️');

  const categories = [
    'All',
    'Romantic Gifts',
    'Proposal Gifts',
    "Valentine's Gifts",
    'Anniversary Gifts',
    'Wedding Gifts',
    'Customized Gifts'
  ];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleProcessCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrd = createOrder({
      userId: 'usr_1',
      items: cart,
      totalAmount: cartTotal + 15, // $15 express romantic gift wrapping & delivery
      shippingName,
      shippingAddress,
      deliveryDate,
      paymentMethod: 'Credit Card (Stripe)'
    });

    setOrderConfirmed(newOrd.id);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-rose-900/30 pb-6 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            Curated Romantic Marketplace
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Digital Gift Shop 🛍️
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Handcrafted luxury gifts, eternal crystal roses, custom rings, & plush teddy bear surprises.
          </p>
        </div>

        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white font-bold text-xs shadow-xl hover:scale-105 transition flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> View Cart (${cartTotal}) [{cart.length}]
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-950/50 font-bold'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(prod => (
          <div
            key={prod.id}
            className="p-5 rounded-3xl bg-slate-900/70 border border-rose-500/20 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-4 hover:border-rose-500/50 transition group"
          >
            <div className="space-y-3">
              <div 
                onClick={() => setSelectedProduct(prod)}
                className="relative h-64 rounded-2xl overflow-hidden border border-rose-500/20 cursor-pointer"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {prod.isBestseller && (
                  <span className="absolute top-3 left-3 text-[10px] px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-extrabold uppercase shadow-lg">
                    ★ Bestseller
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-rose-300 uppercase font-semibold">{prod.category}</span>
                <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {prod.rating} ({prod.reviewsCount})
                </div>
              </div>

              <h3 
                onClick={() => setSelectedProduct(prod)}
                className="font-serif text-xl font-bold text-white group-hover:text-rose-300 transition cursor-pointer"
              >
                {prod.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2">{prod.description}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <div>
                <span className="font-serif text-2xl font-bold text-white">${prod.price}</span>
                {prod.originalPrice && (
                  <span className="text-xs text-slate-500 line-through ml-2">${prod.originalPrice}</span>
                )}
              </div>

              <button
                onClick={() => addToCart(prod)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SHOPPING CART / CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full my-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="font-serif text-2xl font-bold flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-amber-400" /> Shopping Cart & Express Checkout
              </h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-slate-400 text-sm">Your shopping cart is currently empty.</p>
              </div>
            ) : (
              <form onSubmit={handleProcessCheckout} className="space-y-6">
                {/* Cart Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map(item => (
                    <div key={item.product.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={item.product.imageUrl} alt="Prod" className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{item.product.name}</p>
                          <p className="text-[11px] text-rose-300">${item.product.price} × {item.quantity}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery Fields */}
                <div className="space-y-3 text-xs pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-amber-400 uppercase tracking-wider">Gift Delivery Details</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={shippingName}
                        onChange={e => setShippingName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Scheduled Delivery Date</label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Delivery Address</label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={e => setShippingAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Custom Gift Note</label>
                    <input
                      type="text"
                      value={giftNote}
                      onChange={e => setGiftNote(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Order Summary & Submit */}
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">Total Amount (Inc. Express Wrapping & Delivery):</span>
                    <span className="font-serif text-2xl font-bold text-white">${cartTotal + 15}</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-amber-300" /> Complete Stripe Checkout
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ORDER CONFIRMATION RECEIPT MODAL */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 text-white text-center space-y-6 shadow-2xl">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-emerald-200">Order Confirmed! 🎉</h3>
            <p className="text-xs text-slate-300">
              Your gift surprise order <code className="text-amber-300">{orderConfirmed}</code> has been placed and is being prepared with romantic care.
            </p>
            <button
              onClick={() => setOrderConfirmed(null)}
              className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
