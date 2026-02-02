import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

function Shopping() {
  const products = [
    { name: "Apple", amount: 200 },
    { name: "Banana", amount: 60 },
    { name: "Grapes", amount: 300 },
    { name: "Pineapple", amount: 100 },
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [cartSearch, setCartSearch] = useState("");

  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (savedCart) {
      setCart(savedCart);
    }
    
  }, []);

  //  SAVE CART TO LOCAL STORAGE 
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD ITEM
  const addToCart = (newItem) => {
    const exists = cart.findIndex((item) => item.name === newItem.name);

    if (exists !== -1) {
      const copy = [...cart];
      copy[exists].quantity += 1;
      setCart(copy);
    } else {
      setCart([
        ...cart,
        { name: newItem.name, quantity: 1, amount: newItem.amount },
      ]);
    }
  };

  // DELETE ONE QUANTITY
  const handleDelete = (deletingItem) => {
    const exists = cart.findIndex((item) => item.name === deletingItem.name);

    if (exists !== -1) {
      const copy = [...cart];
      copy[exists].quantity -= 1;

      if (copy[exists].quantity === 0) {
        setCart(copy.filter((item) => item.name !== deletingItem.name));
      } else {
        setCart(copy);
      }
    }
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (prev, curr) => prev + curr.amount * curr.quantity,
    0
  );

  // DELETE ALL
  const deleteAll = () => setCart([]);

  // DELETE ENTIRE ITEM
  const deleteItem = (deletingItem) => {
    setCart(cart.filter((item) => item.name !== deletingItem.name));
  };

  return (
    <div className="p-6 w-1/2 mx-auto mt-10 bg-gray-50 shadow-xl rounded-xl animate-fadeIn">
      <h2 className="text-3xl font-bold text-center bg-yellow-300 py-2 rounded-xl shadow mb-6">
        Shopping Cart
      </h2>

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search products..."
        className="border-2 my-4 w-1/2 px-3 py-2 rounded shadow "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PRODUCT LIST */}
      {products
        .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
        .map((p, index) => (
          <div
            key={index}
            className="flex justify-between p-3  border rounded-lg mb-3 shadow hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            <p className="font-medium">{p.name}</p>
            <p className="text-gray-500">${p.amount}</p>

            <button
              onClick={() => addToCart(p)}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all text-white px-4 py-1 rounded-lg shadow"
            >
              Add
            </button>
          </div>
        ))}

      {/* CART SECTION */}
      <div className="mt-6">
        {cart.length === 0 && (
          <p className="text-center text-red-500 font-bold mt-8 animate-fadeIn">
            Your cart is empty. Please add items!
          </p>
        )}

        {cart.length > 0 && (
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2 bg-green-600 rounded-xl shadow text-white py-2 animate-fadeIn">
            Cart Items <FaShoppingCart />
          </h3>
        )}

        {cart.length > 0 && (
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Search in cart..."
              className="border-2 my-4 w-1/2 px-3 py-2 rounded shadow "
              value={cartSearch}
              onChange={(e) => setCartSearch(e.target.value)}
            />

            <button
              className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white rounded-xl px-4 m-4 font-medium shadow"
              onClick={deleteAll}
            >
              Delete All
            </button>
          </div>
        )}

        {/* CART ITEMS */}
        {cart
          .filter((p) =>
            p.name.toLowerCase().includes(cartSearch.toLowerCase())
          )
          .map((item, index) => (
            <div
              key={index}
              className="p-3 flex justify-between items-center bg-white border shadow rounded-lg my-2 hover:shadow-xl transition-all duration-200 animate-fadeIn"
            >
              <p className="font-medium">{item.name}</p>

              <div className="text-center font-semibold bg-green-200 px-3 py-1 rounded">
                {item.quantity}
              </div>

              <div className="text-gray-600 font-medium">
                ${item.amount * item.quantity}
              </div>

              <button
                className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white rounded px-3 py-1"
                onClick={() => handleDelete(item)}
              >
                Delete -1
              </button>

              {item.quantity > 1 && (
                <button
                  className="bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all text-white rounded px-3 py-1"
                  onClick={() => deleteItem(item)}
                >
                  Remove Item
                </button>
              )}
            </div>
          ))}

        {/* TOTAL */}
        {cart.length > 0 && (
          <div className="flex justify-center text-center mx-64 font-bold text-xl bg-green-500 text-white py-2 mt-6 rounded-xl shadow animate-bounce hover:bg-green-600 ">
            Total Price: ${totalPrice}
          </div>
        )}
      </div>
    </div>
  );
}

export default Shopping;
