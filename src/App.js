import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'


function App() {
  const [dice, setNewDice] = useState(allNewDice());
  const [tenzies , setTenzies] = useState(false)

  useEffect(()=>{
    const allHeld = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value===firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won !")
    }
  }, [dice])

  function generatedNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generatedNewDice());
    }
    return newDice;
  }

  function rollDice() {
    setNewDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generatedNewDice();
      })
    );
  }

  function holdDice(id) {
    setNewDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzins Game</h1>
      <p className="intro">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice} className="dice-btn">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
