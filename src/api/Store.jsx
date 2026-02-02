import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";

function Store() {
      const[stores,setStores]=useState([]);

      const navigate = useNavigate()

     useEffect(() => {
       fetchStoreFromApi();
     }, []);



     const fetchStoreFromApi = async () => {
    try {
      const storeApi = await fetch(
        "https://fakestoreapi.com/products",
        {
          method: "GET",
        }
      );
      const storeResponse = await storeApi.json();
      console.log(storeResponse);
      setStores(storeResponse);
      console.log(storeApi);
    } catch (error) {
      alert(error + "");
    }
  };


  return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold text-center mb-8">Fake Store</h1>

    {(
      <div className="grid grid-cols-3 gap-6">
        {stores.map((item,index) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-xl p-4 transition-all duration-300 hover:shadow-xl "
          >
            {/* Image */}
            <div className="flex justify-center items-center h-48">
              <img
                src={item.image}
                alt={item.title}
                className="h-full "
              />
            </div>

            {/* Title */}
            <h2 className="text-sm font-semibold mt-4 line-clamp-2">
              {item.title}
            </h2>

            {/* Category */}
            <p className="text-sm text-gray-500 mt-1 ">
              {item.category}
            </p>

            {/* Price / Rating */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-lg font-bold text-blue-600">
                ₹ {item.price}
              </p>

              <p className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                {item.rating.rate}
              </p>
            </div>
            {/* Description */}
            <div className="text-xs text-gray-400">{item.description}</div>

            {/* Button */}
            <button  onClick={()=>{
                navigate('/details?id='+item.id+'&name='+item.title+'&desc='+item.description)
            }}
            className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default Store