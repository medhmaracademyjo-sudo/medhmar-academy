"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TranslatedPartners } from "@/types";

export default function InitiativePartners({ isAr,partners }: { isAr: boolean,partners:TranslatedPartners[] }) {
 

  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <section className="bg-green-50">
    <section className="py-24 max-w-[90vw] mx-auto px-4 ">
      <h2 className="text-4xl centert font-extrabold text-[#397a34] mb-8 text-center">
        {isAr ? "الشركات القائمة على المبادرة" : "Initiative Partners"}
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          skipSnaps: false, 
           direction: isAr ? "rtl" : "ltr" 
        }}
        plugins={[autoplay.current]}
        className="w-full relative"
      >
        <CarouselContent className="flex gap-6">
          {partners.map((partner, index) => (
            <CarouselItem
              key={index}
              className="flex-none w-full sm:w-1/2 lg:w-1/3" 
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 md:w-32 bg-white md:h-32 rounded-full overflow-hidden mb-3 border-2 border-gray-200">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-center text-sm md:text-base font-medium">
                  {partner.name}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
    </section>
    </section>
  );
}
