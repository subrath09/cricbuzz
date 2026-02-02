import React from "react"; 
import LocationCard from "./LocationCard";

function Connect() {
  return (
    <div>
      <div className="m-20 mt-40 w-[55%]  max-lg:mt-6 max-lg:text-center ">
        <p className="font-medium text-4xl leading-8 pb-10 max-lg:text-2xl max-lg:text-center max-lg:pb-2">
          Connect with Us
        </p>
        <p>
          We’re here to help and answer any questions you might have. Whether
          you’re interested in our services, need assistance with an existing
          project, or just want to share some feedback, feel free to reach out
          to us.
        </p>
      </div>
      <div className=" grid grid-cols-[1.1fr_0.9fr] m-20 pt-6 leading-8 max-lg:m-6 max-lg:pt-1">
        <img src={'/locationMap.webp'} alt="" class="max-lg:hidden"/>
        <container class="ml-10 pl-10  gap-10 max-lg:ml-2 max-lg:pl-2 max-lg:justify-center ">
          <form className="border-b border-gray-400 my-8">Full Name</form>
          <form className="border-b border-gray-400 my-8">Email Id</form>
          <form className="border-b border-gray-400 my-8">Phone Number</form>
          <form className="border-b border-gray-400 my-8 pb-5">Message..</form>
          <button className="text-green-600 border-2 py-3 px-8 border-green-600 rounded-xl font-medium">
            Submit
          </button>
        </container>
      </div>
      <div className=" grid grid-cols-3 m-24 items-center max-lg:grid-cols-1 max-lg:m-2 max-lg:text-sm">
        <LocationCard country="India" address="No.20,Block No.5/2, Sankranthi Industrial Estate, Mysore Rd, Pantarapalya, Nayanda Halli, Bengaluru, Karnataka 560039"/>
        <LocationCard country="Dubai" address="Warehouse XYZ,Street - 123,Jabel Ali Freezone - Dubai"/>
        <LocationCard country="UK" address="123 High Street, London, SW1A 1AA, United Kingdom"/>
      </div>
    </div>
  );
}

export default Connect;
