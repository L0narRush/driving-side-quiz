import { useState } from "react";

const countryData = {
  "United Kingdom": "left",
  "United States": "right",
  "Japan": "left",
  "Germany": "right",
  "India": "left",
  "France": "right",
  "Australia": "left",
  "Canada": "right",
  "New Zealand": "left",
  "South Africa": "left",
  "Brazil": "right",
  "Sweden": "right",
};

export default function App() {
  const totalRounds = 5;
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [usedCountries, setUsedCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(getNextCountry([]));
  const [gameOver, setGameOver] = useState(false);

  function getNextCountry(used) {
    const available = Object.keys(countryData).filter((c) => !used.includes(c));
    return available[Math.floor(Math.random() * available.length)];
  }

  function handleSubmit(e) {
    e.preventDefault();
    const correct = countryData[currentCountry];
    const userAnswer = input.toLowerCase().trim();
    const isCorrect = userAnswer === correct;

    setFeedback(
      isCorrect
        ? "✅ Correct!"
        : `❌ Wrong. ${currentCountry} drives on the ${correct}.`
    );

    if (isCorrect) setScore(score + 1);

    if (round < totalRounds) {
      const nextUsed = [...usedCountries, currentCountry];
      setUsedCountries(nextUsed);
      const next = getNextCountry(nextUsed);
      setCurrentCountry(next);
      setRound(round + 1);
      setInput("");
    } else {
      setGameOver(true);
      setFeedback(
        `🎉 Game Over! You scored ${isCorrect ? score + 1 : score} out of ${totalRounds}.`
      );
    }
  }

  function handleRestart() {
    setScore(0);
    setRound(1);
    setInput("");
    setFeedback("");
    setUsedCountries([]);
    setCurrentCountry(getNextCountry([]));
    setGameOver(false);
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 20,
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1>🚗 Driving Side Quiz</h1>
      {!gameOver ? (
        <>
          <h2>Round {round} of {totalRounds}</h2>
          <p>Which side of the road does <strong>{currentCountry}</strong> drive on?</p>
          <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
            <input
              type="text"
              placeholder="left or right"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
              style={{ padding: "10px", fontSize: "16px", width: "60%" }}
            />
            <br /><br />
            <button
              type="submit"
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>{feedback}</h2>
          <button
            onClick={handleRestart}
            style={{
              marginTop: 20,
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            🔁 Play Again
          </button>
        </>
      )}
      <p style={{ marginTop: 20, fontSize: "18px" }}>{!gameOver && feedback}</p>
    </div>
  );
}
