import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import styles from "./quiz.module.css";

function QuizGamePage() {
  const quiz = [
    {
      q: "What does HTML stand for?",
      a: ["Hyper Text Markup Language", "High Text Machine", "Hyper Tool ML"],
      c: 0,
    },
    {
      q: "Which is a programming language?",
      a: ["HTML", "CSS", "JavaScript"],
      c: 2,
    },
    { q: "JS comment symbol?", a: ["//", "#", "<!-- -->"], c: 0 },
    { q: "Used for styling?", a: ["HTML", "CSS", "JS"], c: 1 },
    { q: "Variable keyword?", a: ["var", "loop", "print"], c: 0 },
  ];

  const words = ["javascript", "function", "variable", "array", "object"];

  const [mode, setMode] = useState("quiz");
  const [quizIndex, setQuizIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [showResult, setShowResult] = useState(false);
  const [input, setInput] = useState("");

  const quizData = [...quiz].sort(() => Math.random() - 0.5);
  const wordData = [...words].sort(() => Math.random() - 0.5);

  /* TIMER */
  useEffect(() => {
    if (showResult) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          next();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  function next() {
    if (mode === "quiz") {
      if (quizIndex < 4) {
        setQuizIndex(quizIndex + 1);
        setTime(20);
      } else {
        setMode("rumble");
        setTime(20);
      }
    } else {
      if (wordIndex < 4) {
        setWordIndex(wordIndex + 1);
        setInput("");
        setTime(20);
      } else {
        setShowResult(true);
      }
    }
  }

  function checkAnswer(i) {
    if (i === quizData[quizIndex].c) {
      setScore(score + 1);
    }
    next();
  }

  function scramble(word) {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  function checkWord() {
    if (input.toLowerCase() === wordData[wordIndex]) {
      setScore(score + 1);
    }
    next();
  }

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.wrapper}>
        <div className={styles.gameBox}>
          <div className={styles.timer}>⏱ Time: {time}s</div>

          {mode === "quiz" && (
            <>
              <h2>
                <span>Programming</span> Quiz
              </h2>

              <p>{quizData[quizIndex].q}</p>

              {quizData[quizIndex].a.map((choice, i) => (
                <button key={i} onClick={() => checkAnswer(i)}>
                  {choice}
                </button>
              ))}
            </>
          )}

          {mode === "rumble" && !showResult && (
            <>
              <h2>
                <span>Rumble</span> Words
              </h2>

              <p>Unscramble: {scramble(wordData[wordIndex])}</p>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Your answer"
              />

              <button onClick={checkWord}>Submit</button>
            </>
          )}
        </div>

        {showResult && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>
                {score >= 7
                  ? "🎉 Congrats! Great Job!"
                  : "💪 Better luck next time!"}
              </h2>

              <p>Score: {score} / 10</p>

              <button onClick={() => window.location.reload()}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default QuizGamePage;
