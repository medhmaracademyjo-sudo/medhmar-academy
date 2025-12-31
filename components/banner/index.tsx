"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Button2 from "../ui/Button2";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { TranslatedBanner } from "@/types";
import Link from "next/link";

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
            <div className="relative w-full aspect-video md:aspect-auto md:h-[90vh]">
              <Card className="h-full w-full">
                <CardContent className="p-0 h-full w-full relative overflow-hidden">
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 z-10" />
                  )}

                  <Image
                    src={banner.image || ""}
                    alt={banner.name || ""}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-700 ${
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />

                  <div className="absolute inset-0 z-30 text-white">
                    <div
                      className={`
                        absolute bottom-10 md:bottom-50
                        ${isAr ? "right-6 md:right-16 text-right" : "left-6 md:left-16 text-left"}
                      `}
                    >
                      <div className="flex flex-col gap-4 max-w-md md:max-w-lg">
                        <p className="text-lg md:text-4xl lg:text-7xl font-bold leading-tight drop-shadow-md">
                          {banner.description || ""}
                        </p>

                        <div >
                          <Link href={"/about"}>
                          <Button2 className="md:px-12! md:py-4! md:text-2xl!">
                            {isAr ? "عن إتقان" : "About Etqan"}
                          </Button2>
                          </Link>
                        </div>
                      </div>
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
