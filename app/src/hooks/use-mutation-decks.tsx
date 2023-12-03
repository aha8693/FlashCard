import { useToast } from "@/components/ui/use-toast";
import { createDeck, deleteDeck, modifyDeck } from "@/lib/api";
import { useStore } from "@/lib/store";

function useMutationDecks() {
  const { toast } = useToast();
  const removeDeck = useStore((state) => state.removeDeck);
  const editDeck = useStore((state) => state.editDeck);
  const addDeck = useStore((state) => state.addDeck);

  const removeDeckById = async (id: string) => {
    try {
      await deleteDeck(id); // api
      removeDeck(id); // decks: front-end
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const editDeckById = async (id: string, newTitle: string) => {
    try {
      await modifyDeck(id, newTitle);
      editDeck(id, newTitle);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  const addNewDeck = async (title: string, image?: string) => {
    try {
      const newDeck = await createDeck(title, image); // Actual creation of deck happens here
      addDeck(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please try again later.",
      });
    }
  };
  return {
    removeDeckById,
    editDeckById,
    addNewDeck,
  };
}

export default useMutationDecks;
