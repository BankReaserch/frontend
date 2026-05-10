"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#f4efe7] px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Title */}
          <div>
            <h1 className="text-3xl font-serif text-[#1a1a1a]">
              Checkout
            </h1>
            <p className="text-gray-500 text-sm">
              Complete your order securely.
            </p>
          </div>

          {/* CONTACT */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h2 className="font-medium mb-3">Contact Information</h2>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {/* SHIPPING */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h2 className="font-medium mb-3">Shipping Information</h2>

            <div className="space-y-3">
              <input placeholder="Full Name" className="input" />
              <input placeholder="Address" className="input" />
              <input placeholder="Apartment, suite, etc. (optional)" className="input" />

              <div className="grid grid-cols-3 gap-3">
                <input placeholder="City" className="input" />
                <input placeholder="State" className="input" />
                <input placeholder="ZIP Code" className="input" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Country" className="input" />
                <input placeholder="Phone (optional)" className="input" />
              </div>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">
            <h2 className="font-medium mb-2">Payment Method</h2>
            <p className="text-xs text-gray-500 mb-4">
              All transactions are secure and encrypted.
            </p>

            {/* Card Option */}
            <div
              onClick={() => setPaymentMethod("card")}
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "card"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Credit / Debit Card
                </span>
                <div className="flex gap-2 text-xs">
                  <span>VISA</span>
                  <span>MC</span>
                  <span>AMEX</span>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-3">
                  <input
                    placeholder="1234 1234 1234 1234"
                    className="input"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="MM / YY" className="input" />
                    <input placeholder="CVC" className="input" />
                  </div>
                </div>
              )}
            </div>

            {/* Apple Pay */}
            <div
              onClick={() => setPaymentMethod("apple")}
              className={`mt-3 border rounded-lg p-4 cursor-pointer ${
                paymentMethod === "apple"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200"
              }`}
            >
               Pay
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <div className="bg-[#0b2a45] text-white rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Hilchos Ribis</span>
                <span>$34.99</span>
              </div>
              <div className="flex justify-between">
                <span>Heter Iska Handbook</span>
                <span>$56.00</span>
              </div>
            </div>

            <div className="border-t border-gray-600 my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>$90.99</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="flex justify-between mt-4 text-lg font-semibold">
              <span>Total</span>
              <span className="text-yellow-400">$90.99</span>
            </div>

            <button className="w-full mt-5 bg-yellow-500 text-black font-medium py-3 rounded-lg hover:opacity-90 transition">
              Pay $90.99
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">
              <Lock size={14} />
              Secure payments by Stripe
            </div>
          </div>

          {/* Info cards */}
          <div className="bg-white rounded-xl p-4 border mt-4 text-sm">
            <p className="font-medium">Secure Checkout</p>
            <p className="text-gray-500 text-xs">
              Your info is encrypted.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border mt-3 text-sm">
            <p className="font-medium">Easy Returns</p>
            <p className="text-gray-500 text-xs">
              7-day hassle-free returns.
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind reusable class */}
      <style jsx>{`
        .input {
          @apply w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500;
        }
      `}</style>
    </div>
  );
}