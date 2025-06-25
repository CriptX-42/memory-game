import { useEffect, useState } from "react";
import { Card } from "@/types";
import { EMOJIS } from "@/constants";

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

export function useMemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);

  const initializeGame = () => {
    setCards(createShuffledCards());
  };

  const handleCardClick = (id: number) => {
    //flip the cliecked card

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card,
      ),
    );
  };

  useEffect(initializeGame, []);

  return { cards, resetGame: initializeGame, handleCardClick };
}
