"use client";

import { AnimatedPageOpacity } from "@/components/AnimatedPage";
import { FaSearch } from "react-icons/fa";
import SearchHistorySection from "./HistorySection";
import { useEffect, useRef, useState } from "react";
import { LayoutProps } from "@/app/(auth)/signup/layout";
import { useParams, useRouter } from "next/navigation";
import TrendingSection from "./TrendingSection";

const SearchPage = ({ children }: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { keyword } = useParams();
  const { push } = useRouter();

  useEffect(
    () => {
      if (keyword && keyword.toString().trim() != "") {
        setIsSearching(true);
        if (inputRef && inputRef.current) {
          inputRef.current.value = decodeURIComponent(keyword.toString()).split(
            "&tab="
          )[0];
        }
      } else setIsSearching(false);
    },
    [keyword]
  );

  function submitSearch(formData: FormData) {
    const keyword = formData.get("search");
    if (keyword && keyword.toString().trim() != "") {
      console.log(keyword);
      push(`/search/${keyword}`);
    }
  }

  function onHistorySelect(text: string) {
    if (inputRef && inputRef.current) {
      inputRef.current.value = text;
      inputRef.current.focus();
    }
  }

  return (
    <AnimatedPageOpacity>
      <div className="page-title ">
        <form
          action={submitSearch}
          className="flex font-normal relative h-fit gap-2"
        >
          <input
            ref={inputRef}
            type="search"
            name="search"
            className="app-text-field rounded-3xl text-sm mb-0"
            placeholder="Find Out More"
          />
          <button
            type="submit"
            className="h-9 small aspect-square rounded-full flex items-center flex-shrink-0 justify-center app-btn px-0 py-0 text-sm"
          >
            <FaSearch />
          </button>
        </form>
      </div>
      {isSearching
        ? children
        : <div className="p-4">
            <SearchHistorySection onHistorySelect={onHistorySelect} />
            <TrendingSection />
          </div>}
    </AnimatedPageOpacity>
  );
};

export default SearchPage;
