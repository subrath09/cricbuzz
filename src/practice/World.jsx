import React, { useState } from "react";

function FontSize(){

    const[fontSize , setFontSize]=useState(16)
   

    const increaseFontSize=()=>{
        setFontSize(prevSize=>prevSize+10);
    }

    const decreaseFontSize=()=>{
        setFontSize(prevSize=>prevSize-10)
    }

    const bothFontSize=()=>{
        // if(fontSize == 40){
        //     setFontSize(80)
        // }else{
        //     setFontSize(40)
        // }

        setFontSize(fontSize == 40 ? 80 : 40)
    }
    

return(
    
    <div className="m-24 flex flex-col justify-center items-center text-center">
        <h1 style={{ fontSize: `${fontSize}px` }}>Hello World</h1>

        <div className="my-8 text-4xl flex items-center gap-5">
            <button onClick={increaseFontSize} className="rounded-xl bg-green-500 px-10 py-2 text-white" >+</button>
            <button onClick={decreaseFontSize} className="rounded-xl bg-red-500 px-10 py-2 text-white">-</button>
        </div>
        <div>
            <button onClick={bothFontSize}   className="rounded-xl bg-blue-500 px-16 py-4 text-2xl  text-white">
                Button
            </button>
        </div>
    </div>

)
}
export default FontSize;