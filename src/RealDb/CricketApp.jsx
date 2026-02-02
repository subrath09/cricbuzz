import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function CricketApp() {
  const [score, setScore] = useState("");

  useEffect(() => {
    const scoreRef = doc(db, "scores", "india");

    onSnapshot(scoreRef, (docSnap) => {
      if (docSnap.exists()) {
        setScore(docSnap.data().score);
      }
    });
  }, []);

  return (
    <div className=" bg-green-700 min-h-screen text-center py-24 flex justify-center">
      <div className="items-center py-40  bg-gray-200 w-1/2 rounded-xl ">
        <h1 className="text-4xl font-medium ">Live Score</h1>
        <h2 className="text-6xl text-red-700 font-bold pt-10">
          {score} <span className="text-xl ">Runs</span>
        </h2>
        <p className="mt-12 text-gray-500">Get Latest Updates on <span className="text-green-600 font-medium">CricApp</span></p>
      </div>
    </div>
  );
}

export default CricketApp;
