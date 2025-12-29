"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { translatedBanner } from "@/types";

type Locale = 'en' | 'ar';

interface BannerProps {
  banners: translatedBanner[];
  locale: Locale;
}

export default function Banner({ banners, locale }: BannerProps) {
  const isAr = locale === 'ar';
  const [loadedImages, setLoadedImages] = React.useState<boolean[]>(Array(banners.length).fill(false));

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <Carousel
      plugins={[Autoplay({ delay: 10000, stopOnInteraction: false })]}
      opts={{ align: "start", direction: isAr ? "rtl" : "ltr" }}
      className="w-full justify-self-center"
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.id || index}>
            <div className="h-[91.5vh] relative">
              <Card className="h-full">
                <CardContent className="p-0 h-full relative">
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                  )}
                  <Image
                    src={banner.image || ""}
                    alt={banner.name || ""}
                    fill
                    className={`object-cover transition-opacity duration-700 ${loadedImages[index] ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => handleImageLoad(index)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className={`absolute ${isAr ? "right-12" : "left-12"} top-2/5 w-[30%] flex flex-col gap-4 text-white`}>
                    <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg">
                      {banner.name || ""}
                    </h2>
                    <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
                      {banner.description || ""}
                    </p>
                    <div className="flex gap-6 mt-4">
                      <Button1>For Individuals</Button1>
                      <Button2>For Businesses</Button2>
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
