import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Scores() {
  const [score, setScore] = useState("");
  const [inputScore, setInputScore] = useState("");

  // Fetch live score
  useEffect(() => {
    const fetchScore = async () => {
      const snapshot = await getDocs(collection(db, "scores"));
      snapshot.forEach((doc) => {
        if (doc.id === "india") {
          setScore(doc.data().score);
        }
      });
    };

    fetchScore();
  }, []);

  // Update score
  const updateScore = async () => {
    if (!inputScore) return alert("Enter score");

    const scoreRef = doc(db, "scores", "india");
    await updateDoc(scoreRef, {
      score: inputScore,
    });
    alert("Score updated successfully");
    setScore(inputScore);
    setInputScore("");
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-yellow-400 flex justify-center py-4 font-bold text-4xl">
        Live Cricket Score
      </div>

      <div className="bg-gray-200 my-6 mx-72 text-center p-6 rounded-xl leading-8 shadow-xl">
        <span className="text-4xl font-medium">India</span>

        <div className="flex justify-center mt-10 font-medium text-gray-700">
          <label>
            Add Score
            <input
              type="number"
              value={inputScore}
              onChange={(e) => setInputScore(e.target.value)}
              className="border-2 border-gray-400 flex rounded w-64 px-2 hover:bg-gray-100"
              placeholder="Add Score"
            />
          </label>
        </div>

        <button
          onClick={updateScore}
          className="mt-10 bg-green-700 text-white font-medium rounded-2xl px-6 py-3 hover:bg-green-800"
        >
          Update Score
        </button>
      </div>
      <button
        onClick={() => navigate("/live")}
        className="bg-red-700 font-bold text-white flex justify-center mx-auto p-4 rounded-full hover:bg-red-800"
      >
        Go to App ?
      </button>
    </div>
  );
}

export default Scores;
