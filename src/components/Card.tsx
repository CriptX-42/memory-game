import { Sparkles } from "lucide-react";

function Card() {
  return (
    <div className="relative h-16 w-16 cursor-pointer">
      {/* //*div em 3D */}
      <div className="h-full w-full">
        {/* //*BACK */}

        <div className="absolute flex h-full w-full items-center justify-center rounded-xl border-2 border-white/20 bg-pink">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        {/* //*FRONT */}
        <div className="absolute flex h-full w-full items-center justify-center rounded-xl border-2 border-white/20 bg-pink">
          🍬
        </div>
      </div>
    </div>
  );
}
export default Card;
