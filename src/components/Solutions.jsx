import React from "react";
import SolutionCard from "./SolutionCard";

function Solutions() {
  return (
    <div className="py-24 mt-16 ">
      <div>
        <h1 className="text-4xl justify-center flex font-medium max-lg:text-2xl ">
          Smart Solutions in Ingredient Innovation
        </h1>
        <p className="flex justify-center py-4 max-lg:text-sm">
          As a leader in food ingredient innovation, Miracle Ingredients unites
          technical, marketing, and R&D experts to shape the region’s evolving
          culinary landscape.
        </p>
      </div>
      <div classNameName=" ">
        <ul className="grid grid-cols-4 m-16 p-6 gap-12 leading-8 max-lg:grid-cols-1 max-lg:m-1 max-lg:p-1 max-lg:text-sm max-lg:gap-4 max-lg:justify-center">
          {Array.from({ length: 7 }).map((data, index) => {
            return (
              <SolutionCard
              key={index}
                title="Animal Feed Ingredients"
                description="High quality animal feed ingredients that support nutrition, performance."
              />
            );
          })}

        
          <button className="text-green-600 bg-[#FAFAFA] font-bold border-2 py-14 rounded-2xl cursor-pointer hover:text-blue-500 transition-all duration-200 max-lg:py-4">
            View More
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Solutions;
