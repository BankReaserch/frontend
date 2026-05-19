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

  const router = useRouter();

  const {
    cart,
    clearCart,
  } = useCart();

  const [loading, setLoading] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("card");

  // FORM
  const [formData, setFormData] =
    useState({
      email: "",

      fullName: "",

      address: "",

      apartment: "",

      city: "",

      state: "",

      zipCode: "",

      country: "",

      phone: "",
    });

  // TOTAL
  const subtotal = useMemo(() => {

    return cart.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  }, [cart]);

  // INPUT CHANGE
  const handleChange = (
    e:
      React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });

  };

  // PLACE ORDER
  const placeOrder = async () => {

    try {

      if (
        cart.length === 0
      ) {
        return alert(
          "Cart is empty"
        );
      }

      setLoading(true);

      const payload = {
        items: cart.map(
          (item) => ({
            book: item.id,

            quantity:
              item.qty,
          })
        ),

        paymentMethod,
      };

      const response =
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/order/place`,
          payload,
          {
            withCredentials: true,
          }
        );

      // SUCCESS
      alert(
        "Order placed successfully"
      );

      clearCart();

      router.push("/");

    } catch (error: any) {

      console.error(
        "Order error:",
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

  return (
    <div className="min-h-screen bg-[#f4efe7] px-6 py-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* TITLE */}
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

            <h2 className="font-medium mb-3">
              Contact Information
            </h2>

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

          {/* SHIPPING */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">

            <h2 className="font-medium mb-3">
              Shipping Information
            </h2>

            <div className="space-y-3">

              <input
                name="fullName"
                placeholder="Full Name"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className="input"
              />

              <input
                name="address"
                placeholder="Address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                className="input"
              />

              <input
                name="apartment"
                placeholder="Apartment, suite, etc. (optional)"
                value={
                  formData.apartment
                }
                onChange={
                  handleChange
                }
                className="input"
              />

              <div className="grid grid-cols-3 gap-3">

                <input
                  name="city"
                  placeholder="City"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />

                <input
                  name="state"
                  placeholder="State"
                  value={
                    formData.state
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />

                <input
                  name="zipCode"
                  placeholder="ZIP Code"
                  value={
                    formData.zipCode
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />

              </div>

              <div className="grid grid-cols-2 gap-3">

                <input
                  name="country"
                  placeholder="Country"
                  value={
                    formData.country
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="input"
                />

              </div>

            </div>

          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-xl p-5 border border-gray-200">

            <h2 className="font-medium mb-2">
              Payment Method
            </h2>

            <p className="text-xs text-gray-500 mb-4">
              Mock payment for now.
            </p>

            {/* CARD */}
            <div
              onClick={() =>
                setPaymentMethod(
                  "card"
                )
              }
              className={`border rounded-lg p-4 cursor-pointer ${
                paymentMethod ===
                "card"
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

            </div>

            {/* APPLE */}
            <div
              onClick={() =>
                setPaymentMethod(
                  "apple"
                )
              }
              className={`mt-3 border rounded-lg p-4 cursor-pointer ${
                paymentMethod ===
                "apple"
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200"
              }`}
            >
               Pay
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div>

          <div className="bg-[#0b2a45] text-white rounded-2xl p-6 shadow-xl">

            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>

            {/* ITEMS */}
            <div className="space-y-4 text-sm">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between"
                >

                  <div>

                    <p>
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      Qty:{" "}
                      {item.qty}
                    </p>

                  </div>

                  <span>
                    $
                    {(
                      item.price *
                      item.qty
                    ).toFixed(2)}
                  </span>

                </div>

              ))}

            </div>

            <div className="border-t border-gray-600 my-4" />

            {/* TOTAL */}
            <div className="space-y-2 text-sm">

              <div className="flex justify-between text-gray-300">

                <span>
                  Subtotal
                </span>

                <span>
                  $
                  {subtotal.toFixed(
                    2
                  )}
                </span>

              </div>

              <div className="flex justify-between text-gray-300">

                <span>
                  Shipping
                </span>

                <span>
                  Free
                </span>

              </div>

            </div>

            <div className="flex justify-between mt-4 text-lg font-semibold">

              <span>Total</span>

              <span className="text-yellow-400">
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
              className="w-full mt-5 bg-yellow-500 text-black font-medium py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >

              {loading
                ? "Processing..."
                : `Place Order • $${subtotal.toFixed(
                    2
                  )}`}

            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-3">

              <Lock size={14} />

              Secure checkout

            </div>

          </div>

        </div>

      </div>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          @apply w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-500;
        }
      `}</style>

    </div>
  );
}