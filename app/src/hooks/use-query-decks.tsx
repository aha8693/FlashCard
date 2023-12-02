import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryDeck() {
  const decks = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);

  const loadDeck = async () => {
    const fetchedDecks = await fetchDecks();
    setDecks(fetchedDecks);
  };

  // React Hook that lets us run side effects in functional components.
  // A side effect is anything that occurs outside of the component's render method, such as fetching data, setting up event listeners, etc.
  useEffect(() => {
    loadDeck();
  }, []); // React will only run the effect once, after the component is mounted.

  return {
    decks,
  };
}

export default useQueryDeck;
