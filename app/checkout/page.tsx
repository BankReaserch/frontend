"use client";

import {
  useMemo,
  useState,
} from "react";

import axios from "axios";

import { Lock } from "lucide-react";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {

  const router =
    useRouter();

  const {
    cart,
    clearCart,
  } = useCart();

  const [loading, setLoading] =
    useState(false);

  const [
    contactMethod,
    setContactMethod,
  ] = useState<
    "email" | "phone"
  >("email");

  // FORM
  const [formData, setFormData] =
    useState({

      fullName: "",

      email: "",

      phone: "",
    });

  // TOTAL
  const subtotal =
    useMemo(() => {

      return cart.reduce(
        (acc, item) =>
          acc +
          item.price *
            item.qty,
        0
      );

    }, [cart]);

  // INPUT CHANGE
  const handleChange =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      setFormData({
        ...formData,

        [e.target.name]:
          e.target.value,
      });
    };

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        if (
          cart.length === 0
        ) {

          return alert(
            "Cart is empty"
          );
        }

        if (
          !formData.fullName
        ) {

          return alert(
            "Please enter your name"
          );
        }

        if (
          contactMethod ===
            "email" &&
          !formData.email
        ) {

          return alert(
            "Please enter email"
          );
        }

        if (
          contactMethod ===
            "phone" &&
          !formData.phone
        ) {

          return alert(
            "Please enter phone number"
          );
        }

        setLoading(true);

        const payload = {

          items:
            cart.map(
              (
                item
              ) => ({
                book:
                  item.id,

                quantity:
                  item.qty,
              })
            ),

          customerName:
            formData.fullName,

          contactMethod,

          email:
            formData.email,

          phone:
            formData.phone,
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/order/place`,
          payload,
          {
            withCredentials:
              true,
          }
        );

        alert(
          "Order submitted successfully"
        );

        clearCart();

        router.push("/");

      } catch (error: any) {

        console.error(
          error
        );

        alert(
          error?.response
            ?.data
            ?.message ||
            "Failed to submit order"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#f4efe7] px-6 py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl p-8 border border-[#e5ddd0] shadow-sm">

            {/* HEADER */}
            <div className="mb-8">

              <span className="text-xs tracking-[0.25em] uppercase text-[#c9a84c]">

                Checkout Details

              </span>

              <h1 className="text-4xl font-serif text-[#0d1b2a] mt-3">

                Complete Your Order

              </h1>

              <p className="text-[#6b7280] mt-3 leading-relaxed">

                Enter your information below and we will contact you regarding your order.

              </p>

            </div>

            {/* NAME */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-[#0d1b2a] mb-2">

                Full Name

              </label>

              <input
                type="text"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                placeholder="Your full name"
                className="input"
              />

            </div>

            {/* CONTACT METHOD */}
            <div className="mb-5">

              <label className="block text-sm font-medium text-[#0d1b2a] mb-3">

                Preferred Contact Method

              </label>

              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setContactMethod(
                      "email"
                    )
                  }
                  className={`px-5 py-3 rounded-2xl border transition-all ${
                    contactMethod ===
                    "email"
                      ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                      : "bg-white border-[#d9dfe7] text-[#0d1b2a]"
                  }`}
                >

                  Email

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setContactMethod(
                      "phone"
                    )
                  }
                  className={`px-5 py-3 rounded-2xl border transition-all ${
                    contactMethod ===
                    "phone"
                      ? "bg-[#0d1b2a] text-white border-[#0d1b2a]"
                      : "bg-white border-[#d9dfe7] text-[#0d1b2a]"
                  }`}
                >

                  Phone

                </button>

              </div>

            </div>

            {/* CONDITIONAL FIELD */}
            {contactMethod ===
            "email" ? (

              <div className="mb-5">

                <label className="block text-sm font-medium text-[#0d1b2a] mb-2">

                  Email Address

                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  className="input"
                />

              </div>

            ) : (

              <div className="mb-5">

                <label className="block text-sm font-medium text-[#0d1b2a] mb-2">

                  Phone Number

                </label>

                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+1 234 567 890"
                  className="input"
                />

              </div>

            )}

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <div className="bg-[#0b1d2d] text-white rounded-3xl p-7 shadow-xl sticky top-8">

            <h2 className="text-xl font-semibold mb-6">

              Order Summary

            </h2>

            {/* ITEMS */}
            <div className="space-y-5">

              {cart.map(
                (item) => (

                  <div
                    key={
                      item.id
                    }
                    className="flex justify-between gap-4"
                  >

                    <div>

                      <h3 className="text-sm font-medium">

                        {
                          item.title
                        }

                      </h3>

                      <p className="text-xs text-gray-400 mt-1">

                        Qty:
                        {" "}
                        {
                          item.qty
                        }

                      </p>

                    </div>

                    <span className="text-sm">

                      $
                      {(
                        item.price *
                        item.qty
                      ).toFixed(
                        2
                      )}

                    </span>

                  </div>
                )
              )}

            </div>

            <div className="border-t border-white/10 my-6" />

            {/* TOTAL */}
            <div className="flex justify-between items-center text-lg font-semibold">

              <span>Total</span>

              <span className="text-[#c9a84c]">

                $
                {subtotal.toFixed(
                  2
                )}

              </span>

            </div>

            {/* BUTTON */}
            <button
              disabled={
                loading ||
                cart.length ===
                  0
              }
              onClick={
                placeOrder
              }
              className="w-full mt-7 bg-[#c9a84c] text-[#0d1b2a] font-medium py-4 rounded-2xl hover:opacity-90 transition disabled:opacity-50"
            >

              {loading
                ? "Submitting..."
                : "Proceed to Checkout"}

            </button>

            {/* SECURITY */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">

              <Lock size={14} />

              Secure order request

            </div>

          </div>

        </div>

      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          @apply w-full border border-[#d9dfe7] rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white;
        }
      `}</style>

    </div>
  );
}