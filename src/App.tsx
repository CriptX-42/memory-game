import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";
import GameModal from "./components/GameModal";
import DifficultySelecotor from "./components/DifficultySelector";
import { useMemoryGame } from "./hooks/use-memory-game";
import { formatTime } from "./lib/formatTime";
import { Difficulty } from "./types";
import { useState } from "react";

function App() {
  const { cards, handleCardClick, moves, time, gameCompleted, resetGame } =
    useMemoryGame();
  const [difficulty, setdifficulty] = useState<Difficulty | null>();

  const formattedTime = formatTime(time);

  if (!difficulty) return <DifficultySelecotor onSelect={difficulty} />;

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-blue-200 p-4 sm:gap-8 sm:p-8">
      <ScoreBoard moves={moves} time={time} onRestart={resetGame} />
      <GameBoard cards={cards} onCardClick={handleCardClick} />
      {gameCompleted && (
        <GameModal moves={moves} time={formattedTime} onRestart={resetGame} />
      )}
    </div>
  );
}

export default App;
