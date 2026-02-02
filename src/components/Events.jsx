import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import EventsCard from "./EventsCard";
import EventsData from "../data/events";

import "swiper/css";

function EventsSwiper() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="m-20 max-lg:m-6">
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 max-lg:flex-col max-lg:gap-6">
        <p>
          <span className="font-medium text-4xl max-lg:text-2xl">Events</span>
          <br />
          Connecting with Industry Leaders and Partners Worldwide
        </p>
        {/* BUTTONS (SAME AS SERVICE) */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl shadow-xl
            ${isBeginning ? "bg-[#a6decf] cursor-not-allowed" : "bg-[#26AE89]"}`}
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
          1024: { slidesPerView: 3 },
        }}
      >
        {EventsData.map((event, index) => (
          <SwiperSlide key={index}>
            <EventsCard
              title={event.title}
              description={event.description}
              img={event.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      
    </div>
  );
}

export default EventsSwiper;
