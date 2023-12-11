import useQueryCard from "@/hooks/use-query-cards";
import Card from "./card";
import { Link } from "react-router-dom";
import { useStore } from "@/lib/store";

const Cards = () => {
  const { cards } = useQueryCard();
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  return (
    <div>
      <Link to={`decks/${selectedDeckId}`}> </Link>
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </div>
  );
};

export default Cards;
