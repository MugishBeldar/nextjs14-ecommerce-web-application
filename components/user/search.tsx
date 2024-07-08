"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import { dealOfTheDay } from "@/data-access/products";
// import { ProductTypes } from "@/types";

import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { getAllTags } from "@/actions/product";
import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const Search = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSearchTerm, searchTerm } = useAppStore();
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [allTags, setAllTags] = useState<string[] | []>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [tagsSuggetion, setTagSuggetion] = useState<string[] | []>([]);
  const [showSearchContainer, setShowSearchContainer] = useState(false);

  useEffect(() => {
    if (debounceSearchTerm) {
      setTagSuggetion(
        allTags.filter((t) =>
          t.toLowerCase().includes(debounceSearchTerm.toLowerCase())
        )
      );
    }
    if (debounceSearchTerm?.length === 0) setTagSuggetion([]);
  }, [allTags, debounceSearchTerm]);

  useEffect(() => {
    async function getAllTagsFromDb() {
      const response = await getAllTags();
      if (response) {
        setAllTags(response);
      }
    }
    getAllTagsFromDb();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        inputRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSearchContainer(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchContainerRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < tagsSuggetion.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const selectedTag = tagsSuggetion[selectedIndex];
      router.push(`/search/${encodeURIComponent(selectedTag)}`);
    }
  };

  return (
    <div className="relative ">
      <Input
        ref={inputRef}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="text-black "
        placeholder="What are you looking for?"
        value={searchTerm}
        onFocus={() => setShowSearchContainer(true)}
      />
      {showSearchContainer &&
        <div ref={searchContainerRef} className="absolute max-h-[300px] overflow-y-scroll scrollbar-hide w-full bg-primary-dark shadow-2xl rounded-xl ">
          {tagsSuggetion &&
            tagsSuggetion.map((t, index: number) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={index}
                  className={cn('m-4 border-b border-gray-200/15 ', isSelected ? "border-b-gray-400" : "")} // fix this div 
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <p
                    key={index}
                    onClick={() => {
                      router.push(`/search/${encodeURIComponent(t)}`);
                    }}
                    className="truncate mb-4 cursor-pointer"
                  >
                    {t}
                  </p>
                </div>
              );
            })}
        </div>
      }
    </div>
  );
};

export default Search;
