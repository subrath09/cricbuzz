import React from "react";

function LocationCard({country='',address=''}) {
  return (
    <div>
      <p className="w-[375px] bg-[#FAFAFA] rounded-xl h-25 p-6">
        <span className="font-medium ">{country}</span>
        <br></br> {address}
      </p>
    </div>
  );
}

export default LocationCard;
