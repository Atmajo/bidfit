"use client";

import React, { useEffect } from "react";
import Hero from "../_components/hero";
import Wrapper from "@/components/shared/wrapper";
import HighlightSection from "../_components/highlight";
import { useLoading } from "@/provider/loading-provider";

const Page = () => {
  const { setLoading } = useLoading();
  
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  
  return (
    <section className="flex flex-col justify-center items-center">
      <Wrapper>
        <Hero />
        <HighlightSection />
      </Wrapper>
    </section>
  );
};

export default Page;
