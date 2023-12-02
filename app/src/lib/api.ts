import { getAuthenticatedUser, getAuthenticatedUserToken } from "./auth";
import { decks } from "./data";
import { Deck } from "./types";

// Mock database
const db = {
  decks: [...decks],
};

// Fetch all posts
export const fetchDecks = async (): Promise<Deck[]> => {
  const token = getAuthenticatedUserToken();


  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/decks?withUserData=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
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
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, image }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${
        responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};
