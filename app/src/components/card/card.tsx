import { useState } from "react";
import type { Card } from "@/lib/types";
import CardActions from "./card-actions";

const Card = ({ card }: { card: Card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="flex justify-center p-4">
      <div className="relative h-60 w-4/5 p-4 mb-8">
        <div
          className="flex w-full h-full bg-white shadow-lg p-4 rounded-lg flex flex-col items-center justify-center"
          onClick={handleCardClick}
        >
          <div className="font-bold text-lg text-center text-black">
            {isFlipped ? card.back : card.front}
          </div>
        </div>
        <div className="absolute top-0 right-0 m-8">
          <CardActions card={card} />
        </div>
      </div>
    </div>
  );
};

export default Card;
