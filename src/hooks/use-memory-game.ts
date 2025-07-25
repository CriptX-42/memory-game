import { useEffect, useState } from "react";
import { Card } from "@/types";
import { EMOJIS } from "@/constants";
import { useTimer } from "../hooks/use-timer";

export const createShuffledCards = () => {
  return [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
};

export const checkGameCompletion = (cards: Card[]) => {
  return cards.every((card: Card) => card.isMatched);
};

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setgameStarted] = useState(false);
  const [gameCompleted, setgameCompleted] = useState(false);

  const { time, resetTime } = useTimer(gameStarted && !gameCompleted);

  const initializeGame = () => {
    setCards(createShuffledCards());
    setMoves(0);
    resetTime();
    setgameStarted(false);
    setgameCompleted(false);
    setFlippedCards([]);
  };

  const handleCardClick = (id: number) => {
    //flip the cliecked card

    //! Essa exclamação é um non-null assertion operator
    const clieckedCard = cards.find((card) => card.id === id)!;

    if (
      flippedCards.length === 2 ||
      clieckedCard.isFlipped ||
      clieckedCard.isMatched
    ) {
      return;
    }

    if (!gameStarted) setgameStarted(true);

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      ),
    );

    const newFlippedCards = [...flippedCards, clieckedCard];

    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      const isMatched = firstCard.emoji === secondCard.emoji;
      setTimeout(() => {
        const updatedCards = cards.map((card) => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return {
              ...card,
              isFlipped: isMatched,
              isMatched,
            };
          }
          return card;
        });

        setCards(updatedCards);
        setFlippedCards([]);

        if (isMatched && checkGameCompletion(updatedCards)) {
          setgameCompleted(true);
        }
      }, 500);
    }
  };

  useEffect(initializeGame, []);

  return {
    cards,
    moves,
    resetGame: initializeGame,
    handleCardClick,
    time,
    gameCompleted,
  };
}
