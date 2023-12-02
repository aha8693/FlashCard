import { createDeck, deleteDeck, modifyDeck } from "@/lib/api";
import { useStore } from "@/lib/store";

function useMutationDecks() {
  const removeDeck = useStore((state) => state.removeDeck);
  const editDeck = useStore((state) => state.editDeck);
  const addDeck = useStore((state) => state.addDeck);

  const removeDeckById = async (id: string) => {
    await deleteDeck(id); // api
    removeDeck(id); // decks: front-end
  };

  const editDeckById = async (id: string, newTitle: string) => {
    await modifyDeck(id, newTitle);
    editDeck(id, newTitle);
  };

  const addNewDeck = async (title: string, image?: string) => {
    const newDeck = await createDeck(title, image); // Actual creation of deck happens here
    addDeck(newDeck);
  };
  return {
    removeDeckById,
    editDeckById,
    addNewDeck,
  };
}

export default useMutationDecks;
