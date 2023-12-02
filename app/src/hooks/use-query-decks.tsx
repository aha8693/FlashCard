import { useToast } from "@/components/ui/use-toast";
import { fetchDecks } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

function useQueryDeck() {
  const { toast } = useToast();
  const decks = useStore((state) => state.decks);
  const setDecks = useStore((state) => state.setDecks);

  const loadDeck = async () => {
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
