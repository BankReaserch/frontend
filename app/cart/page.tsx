"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import axios from "axios";


export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const items = cart;
  const [step, setStep] = useState<"cart" | "checkout" | "confirmation">("cart");
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({ fullName: "", contactMethod: "email", email: "", phone: "", address: "", zip: "", });
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = subtotal;

  const f = (n: number) => `$${n.toFixed(2)}`;
  const placeOrder =
    async () => {
      try {
        if (
          !form.fullName ||
          !form.address ||
          !form.zip
        ) {

          alert(
            "Please fill all required fields"
          );

          return;
        }

        if (
          form.contactMethod ===
          "email" &&
          !form.email
        ) {

          alert(
            "Please enter email"
          );

          return;
        }

        if (
          form.contactMethod ===
          "phone" &&
          !form.phone
        ) {

          alert(
            "Please enter phone number"
          );

          return;
        }

        setLoading(true);

        // API CALL
        const response =
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}api/order/place`,
            {
              items:
                items.map(
                  (item) => ({
                    book:
                      item.id,

                    quantity:
                      item.qty,
                  })
                ),

              contactInfo:
              {
                fullName:
                  form.fullName,

                contactMethod:
                  form.contactMethod,

                email:
                  form.email,

                phone:
                  form.phone,

                address:
                  form.address,

                zip:
                  form.zip,
              },
            },
            {
              withCredentials:
                true,
            }
          );

        setOrderId(
          response.data.data
            ?.orderNumber ||
          response.data.data
            ?._id
        );

        clearCart();
        setStep(
          "confirmation"
        );

      } catch (error: any) {

        console.error(
          "Order Error:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
          "Failed to place order"
        );
      } finally {
        setLoading(false);
      }
    };

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
            Your order <span className="text-[#0d1b2a] font-semibold">{orderId}</span> has been placed.
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
                          <button onClick={() => updateQuantity(item.id, item.qty - 1)} className="px-3 py-1.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-sm">−</button>
                          <span className="px-3 py-1.5 text-[#0d1b2a] text-sm font-semibold border-x border-[#e5ddd0]">{item.qty}</span>
                          <button onClick={() => updateQuantity(item.id, item.qty + 1)} className="px-3 py-1.5 text-[#6b5e4e] hover:bg-[#f5f0e8] transition text-sm">+</button>
                        </div>
                        <p className="text-[#0d1b2a] font-bold">{f(item.price * item.qty)}</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#b0a898] hover:text-[#d85a30] text-[10px] transition">Remove</button>
                      </div>
                    </div>
                  ))
                )}


              </>
            )}

            {step === "checkout" && (
              <div className="space-y-5">

                {/* CONTACT INFO */}
                <div className="bg-white border border-[#e5ddd0] rounded-xl p-6">

                  <h2 className="text-[#0d1b2a] font-serif text-lg mb-5">

                    Contact Information

                  </h2>

                  <div className="space-y-5">

                    {/* NAME */}
                    <div>

                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">

                        Full Name

                      </label>

                      <input
                        type="text"
                        placeholder="Yosef Cohen"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            fullName:
                              e.target.value,
                          }))
                        }
                        className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
                      />

                    </div>

                    {/* CONTACT METHOD */}
                    <div>

                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-3">

                        How would you like to be contacted?

                      </label>

                      <div className="flex gap-4">

                        {/* EMAIL */}
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              contactMethod:
                                "email",
                            }))
                          }
                          className={`flex-1 border rounded-xl px-5 py-4 text-sm font-medium transition ${form.contactMethod ===
                            "email"
                            ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                            : "bg-[#faf8f5] border-[#e5ddd0] text-[#0d1b2a]"
                            }`}
                        >

                          Email

                        </button>

                        {/* PHONE */}
                        <button
                          type="button"
                          onClick={() =>
                            setForm((p) => ({
                              ...p,
                              contactMethod:
                                "phone",
                            }))
                          }
                          className={`flex-1 border rounded-xl px-5 py-4 text-sm font-medium transition ${form.contactMethod ===
                            "phone"
                            ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                            : "bg-[#faf8f5] border-[#e5ddd0] text-[#0d1b2a]"
                            }`}
                        >
                          Phone
                        </button>
                      </div>
                    </div>
                    {form.contactMethod ===
                      "email" ? (

                      <div>

                        <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">

                          Email Address

                        </label>

                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              email:
                                e.target.value,
                            }))
                          }
                          className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
                        />

                      </div>

                    ) : (

                      <div>

                        <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">

                          Phone Number

                        </label>

                        <input
                          type="text"
                          placeholder="+1 234 567 890"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              phone:
                                e.target.value,
                            }))
                          }
                          className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
                        />

                      </div>

                    )}

                    {/* ADDRESS */}
                    <div>

                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">

                        Address

                      </label>

                      <input
                        type="text"
                        placeholder="123 Main St"
                        value={form.address}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            address:
                              e.target.value,
                          }))
                        }
                        className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
                      />

                    </div>

                    {/* ZIP */}
                    <div>

                      <label className="block text-[#8a9bb0] text-[10px] tracking-widest uppercase mb-1.5">

                        ZIP Code

                      </label>

                      <input
                        type="text"
                        placeholder="08701"
                        value={form.zip}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            zip:
                              e.target.value,
                          }))
                        }
                        className="w-full border border-[#e5ddd0] rounded-lg px-4 py-2.5 text-sm text-[#0d1b2a] placeholder-[#b0a898] focus:outline-none focus:border-[#c9a84c] transition bg-[#faf8f5]"
                      />

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
                {/* <div className="flex justify-between text-xs">
                  <span className="text-[#8a9bb0]">Shipping</span>
                  <span className="text-white">{shippingCost === 0 ? "Free" : f(shippingCost)}</span>
                </div> */}
                {/* {couponApplied && (
                  <div className="flex justify-between text-xs">
                    <span className="text-[#4caf82]">Coupon (RIBIS10)</span>
                    <span className="text-[#4caf82]">−{f(discount)}</span>
                  </div>
                )} */}
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
                  onClick={
                    placeOrder
                  }
                  disabled={loading}
                  className="w-full mt-6 bg-[#c9a84c] text-[#0d1b2a] font-bold py-3 rounded-xl text-sm tracking-wide hover:bg-[#d4b567] transition"
                >
                  {
                    loading
                      ? "Placing Order..."
                      : `Place Order · ${f(total)}`
                  }
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
