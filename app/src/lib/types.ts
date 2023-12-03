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
