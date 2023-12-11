import { useToast } from "@/components/ui/use-toast";
import { fetchDeckById, fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Deck } from "@/lib/types";
import { useEffect, useState } from "react";

function useQueryDeck() {
  const { toast } = useToast();
  const decks = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);

  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  let [deck, setDeck] = useState<Deck | null>(null);

  const loadDecks = async () => {
    try {
      const fetchedDecks = await fetchDecks();
      setDecks(fetchedDecks);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch Decks",
        description:
          (error as Error).message ||
          "There was an error loading the Decks. Please try again later.",
      });
    }
  };

  const loadDeck = async (deckId: string) => {
    let deck = null;
    try {
      deck = await fetchDeckById(deckId);
      setDeck(deck);
      setSelectedDeckId(deck.id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to fetch Decks",
        description:
          (error as Error).message ||
          "There was an error loading the Decks. Please try again later.",
      });
    }
  };

  // React Hook that lets us run side effects in functional components.
  // A side effect is anything that occurs outside of the component's render method, such as fetching data, setting up event listeners, etc.
  useEffect(() => {
    loadDecks();
  }, []); // React will only run the effect once, after the component is mounted.

  return {
    decks,
    deck,
    loadDeck,
  };
}

export default useQueryDeck;
