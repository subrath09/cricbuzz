import React from "react";

function Footer() {
  return (
    <div>
      <div classNameName="text-center font-medium ">
        <p className="border-t border-gray-300 my-4 mx-4 "></p>
        <footer className="">
          <ul className="flex  justify-center gap-10 max-lg:flex-wrap max-lg:text-sm max-lg:text-center max-lg:text-sm max-lg:gap-6">
            <li>Home</li>
            <li>Markets</li>
            <li>Solutions</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Insights</li>
            <li>FAQs</li>
            <li>Career</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </footer>
        <p className="border-t border-gray-300 my-4 mx-4"></p>
      </div>
      <div className="flex mt-20 px-24 max-lg:hidden ">
        <span className="text-red-600 font-bold text-9xl ">MIRACLE</span>
        <p className="font-medium text-2xl p-1 ml-10 mt-10 w-[400px]">
          Empowering Industries with Pure, High-Quality Ingredients<br></br>
        </p>
      </div>
      <div className="font-bold text-9xl text-yellow-500 flex justify-end pr-24 max-lg:hidden">
        INGREDIENTS
      </div>
      <div className="m-24 grid grid-cols-3 max-lg:grid-cols-1 max-lg:m-4 max-lg:text-sm ">
        <div className=" max-lg:text-sm">
          <h1 className="text-[#515151] py-4  ">Product Range</h1>
          <ul className="text-xl leading-8 max-lg:text-sm">
            <li className="text-green-600">Animal feed industry</li>
            <li>Construction industry</li>
            <li>Cosmetic industry</li>
            <li>Flavours industry</li>
            <li>Food industry</li>
            <li>Pharmaceutical industry</li>
            <li>Textile industry</li>
          </ul>
        </div>
        <div className="">
          <p className="text-[#515151] py-4">Drop Us A Line</p>
          <ul className="text-xl leading-8 max-lg:text-sm">
            <li>info@miracleingredients.com</li>

            <h1 className="text-[#515151] pt-14 max-lg:text-sm">Phone</h1>
            <li className="py-2">080 2675 0142</li>
          </ul>
        </div>
        <div className="w-[350px] max-lg:text-sm ">
          <p className="text-[#515151] py-4">Visit Us</p>
          <ul className="text-xl leading-8 max-lg:text-sm">
            <li>
              No.20,Block No.5/2, Sankranthi Industrial Estate, Mysore Rd,
              Pantarapalya, Nayanda Halli, Bengaluru, Karnataka 560039
            </li>
            <li className=" text-[#515151] pt-12">Follow US</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-gray-300 my-4 mx-4"></p>
      <footer className="flex flex-cols justify-between m-6 ">
        <p className=" text-[#515151] ml-10 ">© 2025 Miracle Ingredients LLP</p>
        <p className="mr-10 ">
          Designed by <span className="font-medium">The PHI </span>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
