import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import bg1 from "../assets/bg.png";
import bg2 from "../assets/bg2.png";
import bg3 from "../assets/bg3.png";

import Button from "./Button";
import Header from "./Header";

const heroImages = [bg1, bg2, bg3];

function Hero() {
  return (
    <div className="relative h-screen  overflow-hidden">
      {/* FADE BACKGROUND */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 1900,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        speed={1000}
        className=""
      >
        {heroImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`hero-${index}`}
              className="
                w-screen h-screen
                object-cover
                object-center overflow-hidden
              "
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10 flex items-end  p-10">
        <div className="flex  items-center w-full px-2 gap-16 max-lg:flex-col max-lg:gap-6">
          <h1 className="text-white text-[64px] font-normal max-lg:text-3xl text-center leading-tight">
            Pure, High-Quality Ingredients
          </h1>

          <Button title="Explore More Ingredients  "  />
        </div>
      </div>

      {/* HEADER */}
      <Header />
    </div>
  );
}

export default Hero;
