"use client";

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQ_DATA = [
  {
    category:
      "General Ribis",
    questions: [
      {
        question:
          "What is Ribis?",
        answer:
          "Ribis refers to the prohibition of charging or paying interest between Jews according to Halacha. The laws are extensive and apply to personal, business, and institutional financial dealings.",
      },

      {
        question:
          "Who do the laws of Ribis apply to?",
        answer:
          "The laws apply to both lenders and borrowers and can affect guarantors, witnesses, agents, businesses, and even indirect financial benefits.",
      },

      {
        question:
          "Can businesses violate Ribis?",
        answer:
          "Yes. Companies, partnerships, and financial institutions can encounter Ribis concerns depending on ownership structure and transaction type.",
      },
    ],
  },

  {
    category:
      "Heter Iska",
    questions: [
      {
        question:
          "What is a Heter Iska?",
        answer:
          "A Heter Iska restructures a loan into a Halachically permissible investment partnership arrangement.",
      },

      {
        question:
          "Do I need a Heter Iska for mortgages?",
        answer:
          "In many cases yes, especially when dealing with Jewish-owned institutions or partnerships.",
      },
    ],
  },

  {
    category:
      "Business & Finance",
    questions: [
      {
        question:
          "Can I charge late fees?",
        answer:
          "Certain late fees may present Ribis concerns depending on structure and timing.",
      },

      {
        question:
          "Are credit cards a Ribis issue?",
        answer:
          "Credit card arrangements can involve multiple Halachic considerations depending on ownership and contractual terms.",
      },
    ],
  },
];

export default function FAQSection() {

  const [openCategory, setOpenCategory] =
    useState<number | null>(
      0
    );

  const [openQuestion, setOpenQuestion] =
    useState<string | null>(
      "0-0"
    );

  return (
    <>
    <div className="bg-[#0B1C2C] text-white pt-20 pb-10">
      <Navbar/>
       </div>
    <section className="bg-[#f5f0e8] py-24 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">

          <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#c9a84c] mb-4">

            Questions & Answers

          </span>

          <h2 className="text-5xl font-serif text-[#0d1b2a]">

            Frequently Asked
            Questions

          </h2>

          <p className="text-[#6b7280] mt-5 max-w-2xl mx-auto leading-relaxed">

            Common questions
            regarding Ribis,
            Heter Iska, and
            practical financial
            Halacha.

          </p>

        </div>

        {/* FAQ */}
        <div className="space-y-6">

          {FAQ_DATA.map(
            (
              section,
              sectionIndex
            ) => {

              const isSectionOpen =
                openCategory ===
                sectionIndex;

              return (
                <div
                  key={
                    section.category
                  }
                  className={`rounded-3xl transition-all duration-300 ${
                    isSectionOpen
                      ? "bg-[#e9eef4] border border-[#d7e0ea]"
                      : "bg-white border border-[#e5ddd0]"
                  }`}
                >

                  {/* CATEGORY HEADER */}
                  <button
                    onClick={() =>
                      setOpenCategory(
                        isSectionOpen
                          ? null
                          : sectionIndex
                      )
                    }
                    className="w-full flex items-center gap-5 px-8 py-7 text-left"
                  >

                    {/* ICON */}
                    <div className="w-11 h-11 rounded-full bg-white shadow-sm border border-[#e5ddd0] flex items-center justify-center shrink-0">

                      {isSectionOpen ? (

                        <ChevronUp
                          size={20}
                          className="text-[#0d1b2a]"
                        />

                      ) : (

                        <ChevronDown
                          size={20}
                          className="text-[#0d1b2a]"
                        />

                      )}

                    </div>

                    {/* TITLE */}
                    <h3 className="text-2xl font-serif text-[#0d1b2a]">

                      {
                        section.category
                      }

                    </h3>

                  </button>

                  {/* QUESTIONS */}
                  {isSectionOpen && (

                    <div className="px-8 pb-8 space-y-4">

                      {section.questions.map(
                        (
                          item,
                          questionIndex
                        ) => {

                          const key = `${sectionIndex}-${questionIndex}`;

                          const isQuestionOpen =
                            openQuestion ===
                            key;

                          return (
                            <div
                              key={
                                key
                              }
                              className="bg-white rounded-2xl border border-[#d9dfe7] overflow-hidden"
                            >

                              {/* QUESTION */}
                              <button
                                onClick={() =>
                                  setOpenQuestion(
                                    isQuestionOpen
                                      ? null
                                      : key
                                  )
                                }
                                className={`w-full flex items-center justify-between gap-6 px-7 py-6 text-left transition ${
                                  isQuestionOpen
                                    ? "border-b border-[#edf1f5]"
                                    : ""
                                }`}
                              >

                                <span className="text-lg font-medium text-[#0d1b2a] leading-relaxed">

                                  {
                                    item.question
                                  }

                                </span>

                                {isQuestionOpen ? (

                                  <ChevronUp
                                    size={
                                      20
                                    }
                                    className="text-[#6b7280] shrink-0"
                                  />

                                ) : (

                                  <ChevronDown
                                    size={
                                      20
                                    }
                                    className="text-[#6b7280] shrink-0"
                                  />

                                )}

                              </button>

                              {/* ANSWER */}
                              {isQuestionOpen && (

                                <div className="px-7 py-6">

                                  <div className="border-l-4 border-[#c9a84c] pl-5">

                                    <p className="text-[#526173] leading-loose text-[16px]">

                                      {
                                        item.answer
                                      }

                                    </p>

                                  </div>

                                </div>

                              )}

                            </div>
                          );
                        }
                      )}

                    </div>

                  )}

                </div>
              );
            }
          )}
        </div>
      </div>

    </section>
    <Footer/>
    </>
  );
}