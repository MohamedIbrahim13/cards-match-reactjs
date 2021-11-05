import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstchoice] = useState(null);
  const [secondChoice, setSecondchoice] = useState(null);
  const [disabled, setDisabed] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));
    setFirstchoice(null);
    setSecondchoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = card => {
    firstChoice ? setSecondchoice(card) : setFirstchoice(card);
  };
  const reset = () => {
    setFirstchoice(null);
    setSecondchoice(null);
    setTurns(prev => prev + 1);
    setDisabed(false);
  };
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabed(true);
      if (firstChoice.src === secondChoice.src) {
        //console.log("matched");
        setCards(prevCard => {
          return prevCard.map(card => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        //console.log("not matched");
        setTimeout(() => reset(), 1500);
      }
    }
  }, [firstChoice, secondChoice]);
  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <div className="App">
      <h1>Magic Cards Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>#Turns : {turns}</p>
    </div>
  );
}

export default App;
