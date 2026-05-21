"use client";

import {useEffect,useState,} from "react";
import {ChevronDown,ChevronUp,} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
type QNAType = {
  _id: string;
  category: string;
  question: string;
  answer: string;
  priority: number;
};
type GroupedQNA = {
  category: string;
  questions: QNAType[];
};

export default function FAQSection() {
  const [faqData, setFaqData] =useState<GroupedQNA[]>([]);
  const [loading, setLoading] =useState(true);
  const [openCategory,setOpenCategory,] = useState<number | null>(0);
  const [openQuestion,setOpenQuestion,] = useState<string | null>(null);

  useEffect(() => {
    const fetchQNA =
      async () => {
        try {
          const response =await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/qna`);
          const data =await response.json();
          const qnas =data.data || [];
          const grouped =qnas.reduce((acc: any,item: QNAType) => {
                const existing =acc.find((group: GroupedQNA) =>
                      group.category ===
                      item.category);
                if (existing) {
                  existing.questions.push(item);
                } else {
                  acc.push({
                    category:
                    item.category,
                    questions: [
                      item,
                    ],
                  });
                }
                return acc;
              },
              []
            );
          grouped.forEach((
              group: GroupedQNA
            ) => {
              group.questions.sort(
                (a,b) =>
                  a.priority -
                  b.priority
              );
            }
          );
          setFaqData(grouped);
        } catch (error) {
          console.error(
            "QNA Fetch Error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };
    fetchQNA();
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="bg-[#0B1C2C] text-white pt-20 pb-10">

        <Navbar />

      </div>

      {/* FAQ */}
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

          {/* LOADING */}
          {loading && (

            <div className="text-center text-[#0d1b2a] text-lg">

              Loading questions...

            </div>
          )}

          {/* FAQ */}
          {!loading && (
            <div className="space-y-6">

              {faqData.map(
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

                      {/* CATEGORY */}
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
                                    item._id
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
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}