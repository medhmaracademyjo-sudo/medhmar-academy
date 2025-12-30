"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { TranslatedBanner } from "@/types";

type Locale = "en" | "ar";

interface BannerProps {
  banners: TranslatedBanner[];
  locale: Locale;
}

export default function Banner({ banners, locale }: BannerProps) {
  const isAr = locale === "ar";
  const [loadedImages, setLoadedImages] = React.useState<boolean[]>(
    Array(banners.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <Carousel
      plugins={[Autoplay({ delay: 10000, stopOnInteraction: false })]}
      opts={{ align: "start", direction: isAr ? "rtl" : "ltr" }}
      className="w-full"
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.name || index}>
            <div className="relative h-[91.5vh] w-full">
              <Card className="h-full w-full">
                <CardContent className="p-0 h-full w-full relative overflow-hidden ">
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 z-10"></div>
                  )}

                  <Image
                    src={banner.image || ""}
                    alt={banner.name || ""}
                    fill
                    className={`object-cover transition-opacity duration-700 ${
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-20"></div>

                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 w-11/12 md:w-[35%] flex flex-col gap-4 text-white z-30 ${
                      isAr ? "right-6 md:right-12" : "left-6 md:left-12"
                    }`}
                  >
                    <p className="text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-md">
                      {banner.description || ""}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <Button1>{isAr ? "للأفراد" : "For Individuals"}</Button1>
                      <Button2>{isAr ? "للشركات" : "For Businesses"}</Button2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
