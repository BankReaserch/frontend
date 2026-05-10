"use client";

import { useState } from "react";
import Link from "next/link";

const CART_ITEMS = [
  {
    id: 1,
    title: "Hilchos Ribis: A Practical Guide",
    author: "Rabbi Y. Blumenkrantz",
    price: 34.99,
    qty: 1,
    category: "Halacha",
  },
  {
    id: 2,
    title: "The Heter Iska Handbook",
    author: "Rabbi M. Tendler",
    price: 28.0,
    qty: 2,
    category: "Finance",
  },
];

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard (5–7 days)", price: 0 },
  { id: "express", label: "Express (2–3 days)", price: 9.99 },
  { id: "overnight", label: "Overnight", price: 24.99 },
];

export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS);
  const [shipping, setShipping] = useState("standard");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "confirmation">("cart");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", address: "", city: "", zip: "", country: "US",
    cardNumber: "", expiry: "", cvv: "", nameOnCard: "",
  });

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingCost = SHIPPING_OPTIONS.find((o) => o.id === shipping)?.price ?? 0;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discount;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "ribis10") setCouponApplied(true);
  };

  const f = (n: number) => `$${n.toFixed(2)}`;

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#0d1b2a] border border-[#c9a84c]/40 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3">Order Confirmed</p>
          <h1 className="text-[#0d1b2a] font-serif text-3xl mb-3">Thank you!</h1>
          <p className="text-[#8a9bb0] text-sm leading-relaxed mb-2">
            Your order <span className="text-[#0d1b2a] font-semibold">#RB-{Math.floor(Math.random() * 90000 + 10000)}</span> has been placed.
          </p>
          <p className="text-[#8a9bb0] text-sm mb-8">
            A confirmation will be sent to <span className="text-[#0d1b2a]">{form.email || "your email"}</span>.
          </p>
          <div className="bg-white border border-[#e5ddd0] rounded-xl p-5 mb-6 text-left space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-[#0d1b2a] text-sm font-medium">{item.title}</p>
                  <p className="text-[#8a9bb0] text-xs">Qty {item.qty}</p>
                </div>
                <span className="text-[#0d1b2a] text-sm font-semibold">{f(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="border-t border-[#e5ddd0] pt-3 flex items-center justify-between">
              <span className="text-[#0d1b2a] font-bold text-sm">Total</span>
              <span className="text-[#0d1b2a] font-bold">{f(total)}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/store" className="flex-1 text-center py-3 bg-[#c9a84c] text-[#0d1b2a] font-bold rounded-xl text-sm hover:bg-[#d4b567] transition">
              Continue Shopping
            </Link>
            <Link href="/" className="flex-1 text-center py-3 border border-[#0d1b2a] text-[#0d1b2a] font-semibold rounded-xl text-sm hover:bg-[#0d1b2a] hover:text-white transition">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Navbar */}
      <nav className="bg-[#0d1b2a] px-6 lg:px-12 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#c9a84c] rounded-md flex items-center justify-center">
            <span className="text-[#0d1b2a] font-bold text-sm font-serif">ר</span>
          </div>
          <span className="text-white font-semibold text-sm">Ribis</span>
        </Link>
        {/* Steps */}
        <div className="flex items-center gap-2">
          {["Cart", "Checkout"].map((s, i) => {
            const active = (step === "cart" && i === 0) || (step === "checkout" && i === 1);
            const done = step === "checkout" && i === 0;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 ${active ? "opacity-100" : "opacity-50"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${done ? "bg-[#4caf82] text-white" : active ? "bg-[#c9a84c] text-[#0d1b2a]" : "bg-white/10 text-white"}`}>
                    {done ? "✓" : i + 1}
                  </div>
                  <span className="text-white text-xs">{s}</span>
                </div>
                {i < 1 && <div className="w-8 h-px bg-white/20" />}
              </div>
            );
          })}
        </div>
        <Link href="/store" className="text-[#8a9bb0] hover:text-white text-xs transition">← Shop</Link>
      </nav>

      <div className="px-6 lg:px-12 py-10 max-w-6xl mx-auto">
        <h1 className="text-[#0d1b2a] font-serif text-3xl mb-8">{step === "cart" ? "Your Cart" : "Checkout"}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-4">
            {step === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="bg-white border border-[#e5ddd0] rounded-xl p-10 text-center">
                    <p className="text-[#8a9bb0] text-sm">Your cart is empty.</p>
                    <Link href="/store" className="text-[#c9a84c] text-sm hover:underline mt-2 inline-block">Browse the shop →</Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="bg-white border border-[#e5ddd0] rounded-xl p-5 flex items-center gap-5">
                      {/* Book thumb */}
                      <div className="w-16 h-20 bg-[#0d1b2a] rounded-md flex-shrink-0 flex items-center justify-center border border-[#c9a84c]/20">
                        <span className="text-[#c9a84c] font-serif text-lg">ר</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#c9a84c] text-[9px] tracking-widest uppercase font-semibold">{item.category}</p>
                        <h3 className="text-[#0d1b2a] font-serif text-sm leading-snug mt-0.5">{item.title}</h3>
                        <p className="text-[#8a9bb0] text-xs">{item.author}</p>
                        <p className="text-[#0d1b2a] font-bold text-sm mt-1">{f(item.price)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center border border-[#e5ddd0] rounded-lg overflow-hidden">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-1.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-sm">−</button>
                          <span className="px-3 py-1.5 text-[#0d1b2a] text-sm font-semibold border-x border-[#e5ddd0]">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-1.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-sm">+</button>
                        </div>
                        <p className="text-[#0d1b2a] font-bold">{f(item.price * item.qty)}</p>
                        <button onClick={() => updateQty(item.id, 0)} className="text-[#b0a898] hover:text-[#d85a30] text-[10px] transition">Remove</button>
                      </div>
                    </div>
                  ))
                )}

                {/* Coupon */}
                <div className="bg-white border border-[#e5ddd0] rounded-xl p-5">
                  <p className="text-[#0d1b2a] text-sm font-semibold mb-3">Have a coupon?</p>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code (try RIBIS10)"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      disabled={couponApplied}
                      className="flex-1 border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5] disabled:opacity-50"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-5 py-2.5 bg-[#0d1b2a] text-[#c9a84c] font-bold text-xs rounded-lg hover:bg-[#1a2e42] transition disabled:opacity-40"
                    >
                      {couponApplied ? "Applied ✓" : "Apply"}
                    </button>
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white border border-[#e5ddd0] rounded-xl p-5">
                  <p className="text-[#0d1b2a] text-sm font-semibold mb-3">Shipping Method</p>
                  <div className="space-y-2">
                    {SHIPPING_OPTIONS.map((opt) => (
                      <label key={opt.id} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${shipping === opt.id ? "border-[#c9a84c] bg-[#c9a84c]/5" : "border-[#e5ddd0] hover:border-[#c9a84c]/50"}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" value={opt.id} checked={shipping === opt.id} onChange={() => setShipping(opt.id)} className="accent-[#c9a84c]" />
                          <span className="text-[#0d1b2a] text-sm">{opt.label}</span>
                        </div>
                        <span className="text-[#0d1b2a] text-sm font-semibold">{opt.price === 0 ? "Free" : f(opt.price)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === "checkout" && (
              <div className="space-y-5">
                {/* Shipping info */}
                <div className="bg-white border border-[#e5ddd0] rounded-xl p-6">
                  <h2 className="text-[#0d1b2a] font-serif text-lg mb-5">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "First Name", field: "firstName", type: "text", placeholder: "Yosef" },
                      { label: "Last Name", field: "lastName", type: "text", placeholder: "Cohen" },
                    ].map(({ label, field, type, placeholder }) => (
                      <div key={field}>
                        <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">{label}</label>
                        <input type={type} placeholder={placeholder} value={(form as Record<string, string>)[field]} onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                      </div>
                    ))}
                    <div className="col-span-2">
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">Email</label>
                      <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">Address</label>
                      <input type="text" placeholder="123 Main St" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                    <div>
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">City</label>
                      <input type="text" placeholder="Lakewood" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                    <div>
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">ZIP Code</label>
                      <input type="text" placeholder="08701" value={form.zip} onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white border border-[#e5ddd0] rounded-xl p-6">
                  <h2 className="text-[#0d1b2a] font-serif text-lg mb-5">Payment</h2>
                  <div className="flex gap-3 mb-5">
                    {["Visa", "MC", "AMEX", "PayPal"].map((card) => (
                      <div key={card} className="px-3 py-1.5 border border-[#e5ddd0] rounded-md text-[10px] text-[#8a9bb0] font-semibold">{card}</div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">Name on Card</label>
                      <input type="text" placeholder="Yosef Cohen" value={form.nameOnCard} onChange={(e) => setForm((p) => ({ ...p, nameOnCard: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                    <div>
                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={(e) => setForm((p) => ({ ...p, cardNumber: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM / YY" value={form.expiry} onChange={(e) => setForm((p) => ({ ...p, expiry: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                      </div>
                      <div>
                        <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">CVV</label>
                        <input type="text" placeholder="•••" value={form.cvv} onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value }))} className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0d1b2a] rounded-xl p-6 sticky top-6">
              <h2 className="text-white font-serif text-lg mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-white text-xs leading-snug truncate">{item.title}</p>
                      <p className="text-[#8a9bb0] text-[10px] mt-0.5">Qty {item.qty}</p>
                    </div>
                    <span className="text-white text-xs font-semibold flex-shrink-0">{f(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#8a9bb0]">Subtotal</span>
                  <span className="text-white">{f(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#8a9bb0]">Shipping</span>
                  <span className="text-white">{shippingCost === 0 ? "Free" : f(shippingCost)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4caf82]">Coupon (RIBIS10)</span>
                    <span className="text-[#4caf82]">−{f(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-white font-bold text-sm">Total</span>
                  <span className="text-[#c9a84c] font-bold text-lg">{f(total)}</span>
                </div>
              </div>

              {step === "cart" ? (
                <button
                  onClick={() => setStep("checkout")}
                  disabled={items.length === 0}
                  className="w-full mt-6 bg-[#c9a84c] text-[#0d1b2a] font-bold py-3 rounded-xl text-sm tracking-wide hover:bg-[#d4b567] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout →
                </button>
              ) : (
                <button
                  onClick={() => setStep("confirmation")}
                  className="w-full mt-6 bg-[#c9a84c] text-[#0d1b2a] font-bold py-3 rounded-xl text-sm tracking-wide hover:bg-[#d4b567] transition"
                >
                  Place Order · {f(total)}
                </button>
              )}

              {step === "checkout" && (
                <button onClick={() => setStep("cart")} className="w-full mt-2 text-[#8a9bb0] hover:text-white text-xs py-2 transition">
                  ← Back to Cart
                </button>
              )}

              <div className="flex items-center justify-center gap-2 mt-4">
                <svg className="w-3 h-3 text-[#8a9bb0]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
                <span className="text-[#8a9bb0] text-[10px]">Secure SSL Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
