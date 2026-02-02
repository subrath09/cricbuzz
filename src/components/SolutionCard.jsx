import React from "react";

// {}

function SolutionCard({title = 'Hello',description= 'Hey words'}) {
  return (
    <li className=" py-4 px-4 bg-[#FAFAFA] rounded-xl  justify-center">
      <span className="font-medium">{title}</span>
      <p className="border-t border-gray-400 my-4"></p>{description}
    </li>
  );
}

export default SolutionCard;
