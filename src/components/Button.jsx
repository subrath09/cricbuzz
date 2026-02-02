import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Button({title=''}) {
  return (
    <button className="border bg-white border-gray-400  rounded-[8px] px-[5px] py-[5px] text-black text-base flex gap-2 justify-around items-center font-medium">
      <div className="bg-[#26ad89] rounded-[8px] px-4 py-4 w-[48px] h-[48px]  ">
        <FaArrowRight className="text-white" />
      </div>
     <div className="mr-4">{title}</div> 
    </button>
  );
}

export default Button;
