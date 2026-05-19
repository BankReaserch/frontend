"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import DashboardHeader
from "../components/DashboardHeader";

export default function LibraryPage() {

  const [books, setBooks] =
    useState([]);

  useEffect(() => {

    fetchLibrary();

  }, []);

  const fetchLibrary =
    async () => {

      try {

        const response =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}api/book/my-library`,
            {
              withCredentials: true,
            }
          );

        setBooks(
          response.data.data ||
            []
        );

      } catch (error) {

        console.error(
          error
        );

      }
    };

  return (
    <div>

      <DashboardHeader
        title="My Library"
        subtitle="Books and resources you own."
      />

      <div className="grid grid-cols-3 gap-5">

        {books.map(
          (book: any) => (

            <div
              key={book._id}
              className="bg-white rounded-2xl border overflow-hidden"
            >

              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${book.coverImage}`}
                alt={
                  book.title
                }
                className="w-full h-64 object-cover"
              />

              <div className="p-5">

                <h2 className="font-semibold">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {book.author}
                </p>

                <button className="w-full mt-4 bg-[#0d1b2a] text-white py-3 rounded-xl">

                  Download

                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}