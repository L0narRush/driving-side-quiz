import { useState } from "react";

// Full driving-side dataset based on your map image
const countryData = {
  // Left-side drivers...
  "United Kingdom": "left",
  "Ireland": "left",
  "Australia": "left",
  "New Zealand": "left",
  "Japan": "left",
  "India": "left",
  "Pakistan": "left",
  "Bangladesh": "left",
  "Indonesia": "left",
  "Malaysia": "left",
  "Singapore": "left",
  "Thailand": "left",
  "South Africa": "left",
  "Kenya": "left",
  "Uganda": "left",
  "Tanzania": "left",
  "Malta": "left",
  "Cyprus": "left",
  "Hong Kong": "left",
  "Macau": "left",
  "Sri Lanka": "left",
  "Nepal": "left",
  "Mozambique": "left",
  "Zambia": "left",
  "Zimbabwe": "left",
  "Botswana": "left",
  "Namibia": "left",
  "Lesotho": "left",
  "Swaziland": "left",
  "Brunei": "left",
  "Samoa": "left",
  "Suriname": "left",

  // Right-side drivers...
  "United States": "right",
  "Canada": "right",
  "Mexico": "right",
  "Brazil": "right",
  "Argentina": "right",
  "Chile": "right",
  "Peru": "right",
  "Colombia": "right",
  "Venezuela": "right",
  "Ecuador": "right",
  "Bolivia": "right",
  "Paraguay": "right",
  "Uruguay": "right",
  "France": "right",
  "Germany": "right",
  "Italy": "right",
  "Spain": "right",
  "Portugal": "right",
  "Belgium": "right",
  "Netherlands": "right",
  "Switzerland": "right",
  "Austria": "right",
  "Poland": "right",
  "Czech Republic": "right",
  "Slovakia": "right",
  "Hungary": "right",
  "Romania": "right",
  "Bulgaria": "right",
  "Greece": "right",
  "Turkey": "right",
  "Russia": "right",
  "Ukraine": "right",
  "Norway": "right",
  "Sweden": "right",
  "Finland": "right",
  "Denmark": "right",
  "China": "right",
  "South Korea": "right",
  "North Korea": "right",
  "Vietnam": "right",
  "Laos": "right",
  "Cambodia": "right",
  "Philippines": "right",
  "Saudi Arabia": "right",
  "Iran": "right",
  "Iraq": "right",
  "Israel": "right",
  "Egypt": "right",
  "Morocco": "right",
  "Algeria": "right",
  "Tunisia": "right",
  "Ethiopia": "right",
  "Nigeria": "right",
  "Ghana": "right"
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
    const allCountries = Object.keys(countryData);
    const available = allCountries.filter((c) => !used.includes(c));
    if (available.length === 0) return null;
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        backgroundColor: "#111",
        color: "white",
        textAlign: "center",
      }}
    >
    <div 
      style={{
        maxWidth: 500,
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
    </div>
  );
}
