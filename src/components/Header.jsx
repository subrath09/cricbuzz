import React from "react";
import { FaArrowRight } from "react-icons/fa";
import img from "../assets/Logo.png";
import Button from "./Button";

function Header() {
  return (
    <div className="bg-white max-lg:hidden p-[12px] rounded-xl mt-8  fixed w-[90%] z-50 shadow-xl left-1/2 top-4 -translate-x-1/2 flex items-center justify-between font-medium">
      <img src={img} className="" />
      <div className="flex justify-center items-center gap-12 cursor-pointer text-[16px] ">
        <p className="hover:text-[#26ad89]">Home</p>
        <p className="hover:text-[#26ad89]">Markets</p>
        <p className="hover:text-[#26ad89]">Solutions</p>
        <p className="hover:text-[#26ad89]">About Us</p>
        <p className="hover:text-[#26ad89]">Contact Us</p>
        <p className="hover:text-[#26ad89]">Insights</p>
      </div>

      <Button title="Enquire Now" />
    </div>
  );
}

export default Header;
