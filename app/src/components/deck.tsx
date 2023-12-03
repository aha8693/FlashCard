import type { Deck } from "@/lib/types";
import DeckActions from "./deck-actions";

const Deck = ({ deck }: { deck: Deck }) => {
  const { title, numberOfCards } = deck;

  return (
    <div className="flex justify-center p-4">
      <div className="relative h-60 w-4/5 p-4 mb-8">
        <div className="absolute w-full h-full bg-white shadow-lg p-4 transform translate-x-2 translate-y-2"></div>
        <div className="absolute w-full h-full bg-white shadow-lg transform translate-x-1 translate-y-1"></div>
        <div className="absolute w-full h-full bg-white shadow-lg">
          <div className="p-8">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-base">{numberOfCards} cards</div>
          </div>
          <div className="absolute top-0 right-0 m-8">
            <DeckActions deck={deck} />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default Deck;
