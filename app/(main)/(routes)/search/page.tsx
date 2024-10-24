"use client";

import Wrapper from "@/components/shared/wrapper";
import { Input } from "@/components/ui/input";
import { typedata } from "@/data";
import { useDebouncer } from "@/hooks/use-debouncer";
import { cn } from "@/lib/utils";
import { Clock, Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Type for search items
type SearchItem = {
  name: string;
  price: number;
  image: string;
  category: string;
};

// Type for recent searches
type RecentSearch = {
  query: string;
  category: string;
  timestamp: number;
  results: SearchItem[];
};

// Type for search result with score
type ScoredSearchItem = SearchItem & {
  score: number;
};

const MAX_RECENT_SEARCHES = 5;

const Page = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const cat = searchParams.get("category") || "all";

  const [data, setData] = useState<SearchItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  const [value, setValue] = useState<string>(q!);
  const [category, setCategory] = useState<string>(cat!);
  const [focus, setFocus] = useState<{ title: string; isFocus: boolean }>({
    title: category!,
    isFocus: true,
  });

  const debouncedValue = useDebouncer(value, 500);
  const debouncedCategory = useDebouncer(category, 500);

  // Handle clear search
  const handleClearSearch = () => {
    setValue("");
    setSearchResults([]);
  };

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Function to normalize text for comparison
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[-\s]/g, "") // Remove hyphens and spaces
      .replace(/[^a-z0-9]/g, ""); // Remove special characters
  };

  // Function to calculate string similarity score
  const calculateSimilarity = (str1: string, str2: string): number => {
    const norm1 = normalizeText(str1);
    const norm2 = normalizeText(str2);

    // Exact match after normalization
    if (norm1 === norm2) return 1;

    // Check if one string contains the other
    if (norm1.includes(norm2) || norm2.includes(norm1)) return 0.8;

    // Count matching consecutive characters
    let score = 0;
    let maxLength = Math.max(norm1.length, norm2.length);
    let consecutiveMatches = 0;

    for (let i = 0; i < Math.min(norm1.length, norm2.length); i++) {
      if (norm1.charAt(i) === norm2.charAt(i)) {
        consecutiveMatches++;
        score += consecutiveMatches / maxLength;
      } else {
        consecutiveMatches = 0;
      }
    }

    // Add partial matching score using arrays instead of Set
    const chars1 = norm1.split("");
    const chars2 = norm2.split("");
    const uniqueChars = Array.from(new Set(chars1.concat(chars2)));
    const commonChars = uniqueChars.filter(
      (char) => norm1.indexOf(char) !== -1 && norm2.indexOf(char) !== -1
    );

    score += (commonChars.length / uniqueChars.length) * 0.5;

    return score / 2; // Normalize the final score
  };

  const searchItems = async (searchTerm: string, category: string) => {
    return new Promise<SearchItem[]>((resolve) => {
      setTimeout(() => {
        const allResults = [
          {
            name: "Boots",
            price: 100,
            image: "/images/boots.png",
            category: "fashion",
          },
          {
            name: "Black Boots",
            price: 120,
            image: "/images/boots.png",
            category: "fashion",
          },
          {
            name: "Running Shoes",
            price: 90,
            image: "/images/boots.png",
            category: "fashion",
          },
          {
            name: "T-Shirt",
            price: 25,
            image: "/images/boots.png",
            category: "clothing",
          },
          {
            name: "Jeans",
            price: 60,
            image: "/images/boots.png",
            category: "clothing",
          },
        ];

        // Score and filter results
        const scoredResults: ScoredSearchItem[] = allResults
          .map((item) => ({
            ...item,
            score: calculateSimilarity(searchTerm, item.name),
          }))
          .filter((item) => item.score > 0.2) // Filter out very low relevance results
          .sort((a, b) => b.score - a.score); // Sort by relevance score

        let results = scoredResults;

        if (category !== "all") {
          results = results.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
        }

        resolve(results);
      }, 1000);
    });
  };

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedValue) {
      params.set("q", debouncedValue);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      params.set("q", value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }

    if (debouncedCategory) {
      params.set("category", debouncedCategory);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    } else {
      params.set("category", "all");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [debouncedValue, debouncedCategory]);

  // Search effect
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedValue) {
        setLoading(true);
        try {
          const results = await searchItems(debouncedValue, debouncedCategory);
          setSearchResults(results);

          // Add to recent searches
          if (results.length > 0) {
            const newSearch: RecentSearch = {
              query: debouncedValue,
              category: debouncedCategory,
              timestamp: Date.now(),
              results: results,
            };

            setRecentSearches((prev) => {
              const updated = [
                newSearch,
                ...prev.filter(
                  (search) =>
                    search.query !== debouncedValue ||
                    search.category !== debouncedCategory
                ),
              ].slice(0, MAX_RECENT_SEARCHES);

              // Save to localStorage
              localStorage.setItem("recentSearches", JSON.stringify(updated));
              return updated;
            });
          }
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    performSearch();
  }, [debouncedValue, debouncedCategory]);

  const getNoResultsMessage = () => {
    if (category === "all") {
      return "No results found";
    }
    return `No results found in ${category} category`;
  };

  // Handle clicking a recent search
  const handleRecentSearchClick = (search: RecentSearch) => {
    setValue(search.query);
    setCategory(search.category);
    setFocus({ title: search.category, isFocus: true });
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Remove single recent search
  const removeRecentSearch = (index: number) => {
    const updated = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <section className="flex flex-col items-center px-40">
      <Wrapper className="w-full">
        <div className="flex items-center bg-[#243647] px-5 py-1 border border-gray-600 rounded-lg w-full shadow-md">
          <Search size={24} className="mr-2 text-gray-500" />
          <div className="relative flex items-center w-full">
            <Input
              className="bg-[#243647] outline-none border-none focus-within:border-none w-full pr-8"
              placeholder="Search for anything"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {value && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-5 py-5">
          {typedata.map(({ id, title }) => (
            <div
              className={cn(
                "bg-[#243647] px-3 py-2 rounded-lg cursor-pointer border border-gray-500 shadow-md select-none",
                focus?.isFocus &&
                  focus.title === title.toLowerCase() &&
                  "bg-slate-900"
              )}
              onClick={() => {
                setFocus({ title: title.toLowerCase(), isFocus: true });
                setCategory(title.toLowerCase());
              }}
              key={id}
            >
              {title}
            </div>
          ))}
        </div>

        <div className="relative">
          {debouncedValue && (
            <div className="absolute w-full h-max bg-white my-2 rounded-lg z-10">
              {loading ? (
                <div className="flex justify-center items-center py-4">
                  <Loader2 className="text-black w-5 h-5 animate-spin" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-5 w-full h-max my-2 rounded-lg p-2 hover:bg-gray-100"
                    >
                      <Image src={item.image} alt="" width={100} height={100} />
                      <div>
                        <h1 className="text-black text-lg font-bold">
                          {item.name}
                        </h1>
                        <p className="text-black text-sm">${item.price}</p>
                        <p className="text-gray-500 text-sm capitalize">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-center items-center py-4 text-gray-500">
                  {getNoResultsMessage()}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="py-5">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Recent Searches</h1>
            {recentSearches.length > 0 && (
              <button
                onClick={clearRecentSearches}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                Clear all
              </button>
            )}
          </div>

          {recentSearches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="bg-[#243647] p-4 rounded-lg border border-gray-600 relative"
                >
                  <button
                    onClick={() => removeRecentSearch(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                  >
                    <X size={16} />
                  </button>

                  <div
                    className="cursor-pointer"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {formatTimeAgo(search.timestamp)}
                      </span>
                    </div>
                    <p className="font-medium mb-1">"{search.query}"</p>
                    <p className="text-sm text-gray-400">
                      Category:{" "}
                      <span className="capitalize">{search.category}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      {search.results.length} results found
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No recent searches</p>
          )}
        </div>
      </Wrapper>
    </section>
  );
};

export default Page;
