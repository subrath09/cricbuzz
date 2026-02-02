import React from "react";
import img from "../assets/introsection.png";
import Button from "./Button";
function Intro() {
  return (
    <div className="para grid grid-cols-[1fr_0.7fr_1fr] gap-12 m-12 min-h-screen ">
      <div className=" text-[40px] h-[720px] font-regular items-center py-20 px-5 font-regular  px-4  ">
        <p className="pb-10">
          Miracle Ingredients delivers high-quality ingredients and custom
          solutions and support in applications to help brands reate innovative,
          science-backed products fast.
        </p>
        <Button title="Read More" />
      </div>

      <div className="w-full h-25 object-cover rounded-2xl self-end pt-60 max-lg:pt-0 ">
        <img src={img} />
      </div>

      <div className="pt-20 max-lg:hidden">
        <span className="text-[#3082C4] text-9xl font-medium text-right flex justify-end max-lg:items-center max-lg:text-6xl">
          #1
        </span>

        <p className="text-[40px] font-medium text-right max-lg:text-sm">
          PARTNERING AND <br />
          CO-DEVELOPING SOLUTIONS WITH TOP INGREDIENT MANUFACTURERS
        </p>

        <p className="border-t border-gray-400 my-4"></p>

        <p className="text-2xl font-medium">Our Mission</p>
        <p>
          To deliver innovative and cost-effective Ingredients and Functional
          solutions you can trust.
        </p>

        <p className="text-2xl font-medium pt-8 max-lg:pt-4">Our Vision</p>
        <p>
          To be a globally recognized leader in ingredient solutions—trusted for
          our quality, driven by innovation, and valued for the lasting
          partnerships we create.
        </p>
      </div>
    </div>
  );
}

export default Intro;
