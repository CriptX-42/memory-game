import Card from "@/components/Card";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-blue-200 p-4">
      <ScoreBoard moves={0} time={0} onRestart={() => {}} />
      <Card />
    </div>
  );
}

export default App;
