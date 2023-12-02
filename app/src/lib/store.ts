import { Deck } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Represents our app's global state
type State = {
  decks: Deck[];
  // Add more state variables like likes and comments
};

// We keep the app's (global) states in the `store.ts` along with the operations that modify it.
type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  editDeck: (id: string, newTitle: string) => void;
  addDeck: (deck: Deck) => void;
};

const initialState: State = {
  decks: [],
};

// `immer` allow us to modify the state using mutable syntax while still returning an immutable copy of the state.
// This ensures that the state is updated correctly and that React re-renders only the components that depend on the changed state.
export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDecks: (decks) => set({ decks }),

    removeDeck: (id) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },
    editDeck: (id, newTitle) => {
      const currentDecks = get().decks;
      const updatedDecks = currentDecks.map((deck) => {
        if (deck.id === id) {
          // If the id matches, then map the corresponding deck with the new title (leave every other attributes alone)
          return { ...deck, title: newTitle };
        }
        return deck;
      });
      set({ decks: updatedDecks });
    },

    addDeck: (deck) => {
      const newDecks = [...get().decks, deck];
      set({ decks: newDecks });
    },
  })),
);
