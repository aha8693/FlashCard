export type Deck = {
  id: string;
  title: string;
  image?: string;
  numberOfCards: number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Card = {
  id: string;
  deckId: string;
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
};
