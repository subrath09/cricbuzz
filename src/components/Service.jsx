import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";

import "swiper/css";

import serviceData from "../data/serviceData";

/* ---------- Slide Layout ---------- */
function SlideContent({ topic, title, image }) {
  return (
    <div
      className="
    grid grid-cols-2 max-lg:grid-cols-1 gap-20
    pl-20 max-lg:px-6
    pt-32
    min-h-[800px]  
     
  "
    >
      {/* LEFT */}
      <div className="leading-8 max-lg:text-center pt-36 bg-[#fafafa]">
        <p className="text-[#515151]">Product Categories</p>

        <h2 className="text-4xl font-medium max-lg:text-2xl mt-2">{topic}</h2>

        <div className="border-b border-gray-400 my-8"></div>

        <h3 className="text-2xl font-medium py-2 max-lg:text-xl">{title}</h3>

        <ul className="flex flex-wrap gap-3 py-3 max-lg:justify-center">
          <li className="border-1 py-1 px-5 rounded-[6px] shadow">Beverages</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow">Bakery</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow">Cereals</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow">Dairy</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow ">
            {" "}
            Confectionary
          </li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow "> Dairy</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow ">Meat</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow ">Noodles</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow ">Snacks</li>
          <li className="border-1 py-1 px-5 rounded-[6px] shadow ">
            Soups,Sauces& Savouries
          </li>
        </ul>

        <div className="border-b border-gray-400 my-8"></div>

        <p>
          We believe great taste and balanced nutrition go hand in hand. Our
          innovative ingredient solutions are designed to enhance flavor,
          improve texture, and boost nutritional value without compromising
          quality.
        </p>
        <div className="flex mt-6 font-medium text-[#32ad88] gap-4"> 
        Explore More 
        <FaArrowRight className="mt-2" />  
      </div>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center items-center ">
        <img
          src={image}
          className="h-[800px] w-full object-cover "
          alt={title}
        />
      </div>
    </div>
  );
}

/* ---------- Swiper With Disabled Buttons ---------- */
function ServiceFullSwiper() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="w-full">
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
        slidesPerView={1}
        speed={800}
        allowTouchMove={true}
        className="w-full"
      >
        {serviceData.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideContent
              topic={item.topic}
              title={item.title}
              image={item.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM BUTTONS */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => swiperRef.current.slidePrev()}
          disabled={isBeginning}
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl  shadow-xl
            ${
              isBeginning ? "bg-[#a6decf] cursor-not-allowed" : "bg-[#26AE89]"
            }`}
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
  );
}

export default ServiceFullSwiper;
