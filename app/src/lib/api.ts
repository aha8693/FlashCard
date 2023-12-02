import { decks } from "./data";
import { Deck } from "./types";
import { nanoid } from "nanoid";

// Mock database
const db = {
  decks: [...decks],
};

// Fetch all posts
export const fetchDecks = async (): Promise<Deck[]> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const deck = await Promise.all(db.decks);
      resolve(deck);
    }, 200); // Simulate an API delay
  });
};

// delete a deck
export const deleteDeck = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.decks = db.decks.filter((deck) => deck.id !== id);
      resolve();
    }, 200); // Simulate an API delay
  });
};

export const modifyDeck = async (
  id: string,
  newTitle: string,
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentDecks = db.decks;
      const updatedDecks = currentDecks.map((deck) => {
        if (deck.id === id) {
          return { ...deck, title: newTitle };
        }
        return deck;
      });
      db.decks = updatedDecks;
      resolve();
    }, 200); // Simulate an API delay
  });
};

//Create a post
export const createDeck = async (
  title: string,
  image?: string,
): Promise<Deck> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newDeck: Deck = {
        id: nanoid(),
        title,
        image,
        numberOfCards: 0,
      };
      resolve(newDeck);
    }, 200); // Simulate an API delay
  });
};
