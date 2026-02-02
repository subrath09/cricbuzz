import React, { useState } from "react";

function ToDo() {
  const [fruit, setFruit] = useState("grapes");
  const [fruits, setFruits] = useState([]);
  
//   const [empty, setEmpty] = useState(false);

  const handleChanges = (e) => {
    setFruit(e.target.value);
    // setEmpty(false);
  };

  const handleAdd = () => {
    if (fruit === "") {
    //   setEmpty(true);
      alert("please enter fruit");
      return;
    }
    setFruits(fruits.concat(fruit));
    setFruit("");
  };

  const handleDelete = (deletingitem) => {
    const newFruits = fruits.filter((item) => item !== deletingitem);
    setFruits(newFruits);
  };

  return (
    <div className="flex flex-col m-24 justify-center items-center ">
      <div className="p-4">
        <input
          type="text"
          value={fruit}
          onChange={handleChanges}
          className="border-2 p-2 rounded-xl"
        />

        <button
          className={`border-2 text-white mx-4 shadow-xl py-2 px-6 font-bold rounded-xl ${
            fruit=='' ? "bg-green-200" : "bg-green-600"
          }`}
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div>
        {fruits.map((item, index) => {
          return (
            <li key={index}>
              {item}{" "}
              <button
                className="border-2 border-red-600 bg-red-500 text-white mx-4 py-1 gap-12 rounded-2xl px-6 font-bold"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default ToDo;
