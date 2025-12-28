"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

interface BannerProps {
  images: string[];
  isAr: boolean;
}

export default function Banner({ images, isAr }: BannerProps) {

  const [loadedImages, setLoadedImages] = React.useState<boolean[]>(
    Array(images.length).fill(false)
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
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        direction: isAr ? "rtl" : "ltr",
      }}
      className="w-full justify-self-center"
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="h-[91.5vh] relative">
              <Card className="h-full">
                <CardContent className="p-0 h-full relative">
                  {!loadedImages[index] && (
                    <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
                  )}

                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(index)}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                  <div
                    className={`absolute ${isAr ? "right-12" : "left-12"} top-1/4 w-[30%] flex flex-col gap-6 text-white`}
                  >
                    <h1 className="text-4xl md:text-7xl font-bold leading-tight drop-shadow-lg">
                      Learn. Lead. Transform.
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
                      Build in-demand skills to unlock your potential and drive outcomes for your career and business.
                    </p>
                    <div className="flex gap-6 mt-4">
                      <Button1>
                        For Individuals
                      </Button1>
                      <Button2>
                        For Businesses
                      </Button2>
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
