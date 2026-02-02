import React, { useState } from "react";

function Counter() {
  // every ui change is considered as state
  // state consists of 2 things
  // getter - setter | read - write / inital value

  // hooks -> useState

  const [count, setCount] = useState(0);

  const [number1,setNumber1] = useState()
  const [number2, setNumber2] = useState()
  const [result,setResult] = useState()

  return (
    <div className="flex flex-col space-y-6 min-h-screen bg-gray-50 items-center justify-center">
      <h1 className="text-5xl font-medium">{count}</h1>

      <div className="flex items-center gap-5">
        <button
          className="rounded-xl bg-green-500 p-4 text-white "
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Add
        </button>

        <button
          className="rounded-xl bg-red-500 p-4 text-white "
          onClick={() => {
            // if(count == 0) return

            if (count != 0) {
              setCount(count - 1);
            }
            else{
                alert("ERROR")
            }
          }}
        >
          Minus
        </button>
      </div>
      
         
         {/* CALCULATOR */}

      <div className="flex flex-col space-y-5">
          <input className="p-3 rounded-xl bg-white shadow" placeholder="Enter Number 1" value={number1} onChange={(event)=>{
            setNumber1(Number(event.target.value))
          }}/>
             <input className="p-3 rounded-xl bg-white shadow" placeholder="Enter Number 2" value={number2} onChange={(event)=>{
                setNumber2(Number(event.target.value))
             }}/>

             <div className="flex items-center gap-4 ">
                <button className="rounded-xl bg-blue-500 p-4 text-white " onClick={()=>{
                    setResult(number1+number2)
                }}>Add</button>

                 <button className="rounded-xl bg-red-500 p-4 text-white" onClick={()=>{
                    setResult(number1-number2)
                }}>Minus</button>

                   <button className="rounded-xl bg-pink-500 p-4 text-white" onClick={()=>{
                    setResult(number1/number2)
                }}>Divide</button>

                   <button className="rounded-xl bg-indigo-500 p-4 text-white" onClick={()=>{
                    setResult(number1*number2)
                }}>Multiply</button>
             </div>

             <p>{result}</p>
      </div>
    </div>
  );
}

export default Counter;
