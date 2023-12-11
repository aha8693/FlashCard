import Deck from "./deck";
import useQueryDeck from "@/hooks/use-query-decks";

const Decks = () => {
  const { decks } = useQueryDeck();

  return (
    <div>
      {decks.map((deck) => (
        <Deck deck={deck} key={deck.id} />
      ))}
    </div>
  );
};

export default Decks;
