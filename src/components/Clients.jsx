import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import ClientsCard from "./ClientsCard";
import Clientc from "../assets/ClientB.png";
import testimonalData from "../data/clients";

import "swiper/css";

function Clients() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="pb-20 m-20">
      {/* HEADING */}
      <div className="text-center my-32 max-lg:my-12 px-4">
        <h2 className="font-medium text-6xl max-lg:text-2xl mb-4">
          Trusted by Our Clients
        </h2>
        <p className="max-w-2xl text-lg mx-auto leading-8">
          Discover how our solutions have transformed operations and enhanced
          success.
        </p>
      </div>

      {/* SWIPER */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        slidesPerView={3}
        spaceBetween={32}
        speed={700}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
        className="px-24 max-lg:px-6"
      >
        {testimonalData.map((testimonal, index) => (
          <SwiperSlide key={index}>
            <ClientsCard
              description={testimonal.description}
              name={testimonal.name}
              profession={testimonal.profession}
              img={Clientc}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* BUTTONS */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl shadow-xl
            ${isBeginning ? " bg-[#a6decf] cursor-not-allowed" : "bg-[#26AE89]"}`}
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={() => swiperRef.current.slideNext()}
          disabled={isEnd}
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl shadow-xl
            ${isEnd ? "bg-[#a6decf] cursor-not-allowed" : "bg-[#26AE89]"}`}
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

export default Clients;
