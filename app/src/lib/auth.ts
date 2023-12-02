import { User } from "./types";
import { jwtDecode } from "jwt-decode";

// Hardcoded authenticated user data for Edsger Dijkstra
// const authenticatedUser: User = {
//   id: "u1",
//   username: "edsger",
//   displayName: "Edsger Dijkstra",
//   avatar: "edsger-dijkstra.webp",
// };

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem('token') as string;
  const decoded = jwtDecode<User>(token);
  return decoded;
};

export const getAuthenticatedUserToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthenticatedUserToken = (token: string) => {
  localStorage.setItem('token', token);
};
