import React from "react";

function ClientsCard({description='khhbchb',name='yfg',profession='knjvn', img='img'}) {
  return (
    <div className=" bg-[#FAFAFA] rounded-xl">
      <p className="text-9xl text-[#D1D1D1] p-6 ">"</p>
      <p className=" text-3xl px-8 font-normal leading-8 ">
        {description}
      </p>
      <div className="bg-white flex px-2 rounded-xl  gap-2 w-1/2  mt-20 text-black-500 ">
        <img src={img} className="h-16 w-12 py-2" />
        <div className="py-2" >
          <p className="font-medium">{name}</p>
          <p className="font-regular text-[#15151580]">{profession}</p>
        </div>
        
      </div>
    </div>
  );
}

export default ClientsCard;
