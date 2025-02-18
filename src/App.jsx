import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useEffect, useState } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Add additional states below as required.
  const [tries, setTries] = useState(0);
  const [userWon, setUserWon] = useState(false);

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  // create additional function to power the
  const handleLetterInput = (e) => {
    const word = e.target.value.toLowerCase();
    const lastLetter = word[word.length - 1];
    if (word.length > guessedLetters.length) {
      setGuessedLetters([...guessedLetters, lastLetter]);
      setTries(tries + 1)
    } else {
      const filteredGuessedLetters = guessedLetters.filter((l, idx) => idx !== guessedLetters.length - 1); // remove the last element
      setGuessedLetters(filteredGuessedLetters);
    }
  }

  const handleRestart = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setTries(0);
    setUserWon(false);
  }

  useEffect(() => {
    const geuessedWord = guessedLetters.join("").toLowerCase()
    const containsAllLetters = currWord.split("").every((l) => geuessedWord.includes(l))
    if (tries < 10 && containsAllLetters) {
      setUserWon(true)
    }
  }, [currWord, guessedLetters, tries])




  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      {userWon ? (
        <div className="win">
          <h1>You won!</h1>
          <button onClick={handleRestart}>Play again</button>
        </div>
      ) : (
        <div className="card">
          <h1>Guess The Word 🚀</h1>
          <h3>Word Display</h3>
          {tries >= 10 ? `you lost the world was ${currWord}` : generateWordDisplay()}
          {tries < 10 &&
            <>
              <h3>Guessed Letters</h3>
              {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
              <br />
              <h3>Input</h3>
              <input type="text" onChange={handleLetterInput} />
            </>
          }
          {/* Insert form element here */}
          {tries >= 10 && <button onClick={handleRestart}>Restart</button>}
        </div>)}
    </>
  );
}

export default App;
