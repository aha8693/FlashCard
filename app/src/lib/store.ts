import { Card, Deck, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Represents our app's global state
type State = {
  decks: Deck[];
  user: User | null;
  cards: Card[];
  selectedDeckId: string | null;
  // Add more state variables like likes and comments
};

// We keep the app's (global) states in the `store.ts` along with the operations that modify it.
type Action = {
  setDecks: (decks: Deck[]) => void;
  removeDeck: (id: string) => void;
  editDeck: (id: string, newTitle: string) => void;
  addDeck: (deck: Deck) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  editCard: (id: string, newFront: string, newBack: string) => void;
  removeCard: (id: string) => void;
  clearCards: () => void;
  setSelectedDeckId: (id: string) => void;
  clearSelectedDeckId: () => void;
};

const initialState: State = {
  decks: [],
  user: null,
  cards: [],
  selectedDeckId: null,
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
      const newDecks = [deck, ...get().decks];
      set({ decks: newDecks });
    },
    setUser: (user) => set({ user }),

    clearUser: () => set({ user: null }),

    setCards: (cards: Card[]) => set({ cards }),

    addCard: (card) => {
      set({
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
              numberOfCards: deck.numberOfCards + 1,
            };
          }
          return deck;
        }),
      });
    },

    editCard: (id, newFront, newBack) => {
      const currentCards = get().cards;
      const updatedCards = currentCards.map((card) => {
        if (card.id === id) {
          return { ...card, front: newFront, back: newBack };
        }
        return card;
      });
      set({ cards: updatedCards });
    },

    removeCard: (id) => {
      const updatedCards = get().cards.filter((card) => card.id !== id);
      set({ cards: updatedCards });
    },

    clearCards: () => set({ cards: [] }),

    setSelectedDeckId: (id) => set({ selectedDeckId: id }),

    clearSelectedDeckId: () => set({ selectedDeckId: null }),
  })),
);
