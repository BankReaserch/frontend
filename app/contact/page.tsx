"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { Mail, Phone, MapPin, MessageSquare, } from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function ContactPage() {
  const [form, setForm] =
  useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

const [loading, setLoading] =
  useState(false);

const onChangeHandler = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {

  const {
    name,
    value,
  } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    setLoading(true);

    const res =
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}api/contact`,
        form
      );

    alert(
      res.data.message
    );

    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

  } catch (error: any) {

    alert(
      error?.response?.data
        ?.message ||
        "Failed to send inquiry"
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <>
      <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
        <Navbar />
      </div>
      <section className="bg-[#f8f5ef] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.8fr_0.8fr]">
            <form
  onSubmit={handleSubmit}
  className="rounded-[35px] bg-white border border-[#ece4d8] p-10 shadow-sm"
>

  <div className="max-w-2xl">

    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c8a21a]">

      Contact Form

    </p>

    <h2 className="mt-4 font-serif text-5xl text-[#051933]">

      Send an Inquiry

    </h2>

    <p className="mt-4 text-[#64748b] leading-8">

      Submit your question and our team will respond
      as soon as possible. Whether you're seeking
      guidance regarding ribis, heter iska, financial
      halacha, or a general inquiry, we're here to help.

    </p>

  </div>

  <div className="grid md:grid-cols-2 gap-5 mt-10">

    <input
      name="name"
      value={form.name}
      onChange={onChangeHandler}
      required
      placeholder="Full Name"
      className="h-14 rounded-2xl border border-[#ece4d8] bg-[#faf8f4] px-5 outline-none focus:border-[#c8a21a]"
    />

    <input
      name="email"
      type="email"
      value={form.email}
      onChange={onChangeHandler}
      required
      placeholder="Email Address"
      className="h-14 rounded-2xl border border-[#ece4d8] bg-[#faf8f4] px-5 outline-none focus:border-[#c8a21a]"
    />

    <input
      name="phone"
      value={form.phone}
      onChange={onChangeHandler}
      required
      placeholder="Phone Number"
      className="h-14 rounded-2xl border border-[#ece4d8] bg-[#faf8f4] px-5 outline-none focus:border-[#c8a21a]"
    />

    <input
      name="subject"
      value={form.subject}
      onChange={onChangeHandler}
      required
      placeholder="Subject"
      className="h-14 rounded-2xl border border-[#ece4d8] bg-[#faf8f4] px-5 outline-none focus:border-[#c8a21a]"
    />

  </div>

  <textarea
    name="message"
    value={form.message}
    onChange={onChangeHandler}
    required
    rows={8}
    placeholder="Please describe your question..."
    className="mt-5 w-full rounded-2xl border border-[#ece4d8] bg-[#faf8f4] p-5 outline-none resize-none focus:border-[#c8a21a]"
  />

  <button
    type="submit"
    disabled={loading}
    className="mt-6 h-14 px-10 rounded-2xl bg-[#051933] text-white hover:bg-[#08264a] transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
  >

    {loading
      ? "Sending..."
      : "Send Inquiry"}

  </button>

</form>
            <div className="rounded-[35px] bg-[#051933] p-10 text-white h-fit sticky top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c8a21a]">
                Contact Information
              </p>
              <h3 className="mt-4 font-serif text-5xl">
                Reach Us
              </h3>
              <p className="mt-4 text-slate-300 leading-8">
                We welcome questions regarding ribis,
                heter iska arrangements, financial
                halacha, and general inquiries.
              </p>
              <div className="mt-10 space-y-8">
                <div className="flex gap-4">
                  <Mail
                    size={20}
                    className="text-[#c8a21a] mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#c8a21a] text-sm uppercase tracking-[0.2em]">
                      General Email
                    </p>
                    <p className="mt-2">
                      info@ribis.org
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MessageSquare
                    size={20}
                    className="text-[#c8a21a] mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#c8a21a] text-sm uppercase tracking-[0.2em]">
                      Rabbinical Guidance
                    </p>
                    <p className="mt-2">
                      halacha@ribis.org
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone
                    size={20}
                    className="text-[#c8a21a] mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#c8a21a] text-sm uppercase tracking-[0.2em]">
                      Telephone
                    </p>
                    <p className="mt-2">
                      (732) 806-5409
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin
                    size={20}
                    className="text-[#c8a21a] mt-1 shrink-0"
                  />
                  <div>
                    <p className="text-[#c8a21a] text-sm uppercase tracking-[0.2em]">
                      Location
                    </p>
                    <p className="mt-2">
                      Lakewood, NJ
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-[#c8a21a] text-sm uppercase tracking-[0.2em]">
                  Office Hours
                </p>
                <div className="mt-5 space-y-4">
                  <div className="flex justify-between text-slate-200">
                    <span>
                      Monday - Thursday
                    </span>
                    <span>
                      9 AM - 5 PM
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>
                      Friday
                    </span>
                    <span>
                      9 AM - 1 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}