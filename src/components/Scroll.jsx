import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
function Scroll() {
  return (
    <div>
      <div>
        <div className="flex justify-center  gap-10 max-lg:m-2 max-lg:p-2">
          <button className="bg-[#26AE89]  w-12 h-12 rounded-xl text-center font-bold text-white">
            <FaArrowLeft className="items-center m-4" />
          </button>
          <button className="bg-[#26AE89]  w-12 h-12 rounded-xl text-center font-bold text-white ">
            <FaArrowRight className="items-center m-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scroll;
