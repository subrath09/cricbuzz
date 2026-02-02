import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

function StoreProduct() {
  const [storeproduct, setStoreProduct] = useState(null);

  const [searchParams,] = useSearchParams()

  useEffect(() => {
    fetchStoreProductFromApi();
  }, []);

  const fetchStoreProductFromApi = async () => {
    try {
      const storeApi = await fetch("https://fakestoreapi.com/products/"+searchParams.get('id'));
      const storeResponse = await storeApi.json();
      setStoreProduct(storeResponse);
    } catch (error) {
      alert(error + "");
    }
  };

  return (
    <div className="min-h-screen mx-64 bg-gray-100 rounded-xl shadow-xl p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Fake Store</h1>

      {!storeproduct ? (
        <p className="text-center text-gray-500">Loading product...</p>
      ) : (
        <div className="gap-8">
          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src={storeproduct.image}
              alt={storeproduct.title}
              className="h-64"
            />
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-bold mb-3 mt-3">
              {storeproduct.title}
            </h2>

            <p className="text-gray-500 text-sm mb-2">
              {storeproduct.category}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-600">
                ₹ {storeproduct.price}
              </p>

              <p className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-bold">
                 {storeproduct.rating.rate}
              </p>
            </div>

            <p className="text-gray-400 text-sm leading-8">
              {storeproduct.description}
            </p>

            <button className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoreProduct;
