import React, { useState } from "react";

function Number() {
  const generateRandom = () => Math.floor(Math.random() * 100) + 1;

  const [numberToGuess, setNumberToGuess] = useState(generateRandom);
  const [guess, setGuess] = useState(0);
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect]=useState(false)

  
  const handleGuess = () => {
    setAttempts(attempts + 1);

    if (guess == numberToGuess) {
      setIsCorrect(true)
      setMessage(
        `congratulations! you guessed the number in ${attempts + 1} attempts`
      );
    } else if (guess < numberToGuess) {
       setIsCorrect(false)
      setMessage("Too low! Try again.");
    } else {
       setIsCorrect(false)
      setMessage("Too high! Try again.");
    }
  };
  return (
    <div className=" flex flex-col m-24 items-center justify-center">
      <div>
        <h1 className="text-6xl font-medium p-6">Guess my Number</h1>
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Guess a number between 1 to 100"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="px-2 py-5 rounded-xl shadow-xl border-2 border-black m-6 w-64"
        />
      </div>

      <span
        className={`font-bold ${isCorrect ? "text-green-500" : "text-red-500"}`}>
        {message}
      </span>
      <div>
        <button
          onClick={handleGuess}
          className="bg-blue-400 border-2 rounded-xl shadow-xl text-white font-medium px-5 py-4 m-6"
        >
          Guess
        </button>
      </div>

      {numberToGuess}
    </div>
  );
}

export default Number;
