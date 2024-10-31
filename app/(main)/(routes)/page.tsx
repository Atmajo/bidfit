"use client";

import React, { useEffect } from "react";
import Hero from "../_components/hero";
import Wrapper from "@/components/shared/wrapper";
import HighlightSection from "../_components/highlight";

const Page = () => {
  
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
