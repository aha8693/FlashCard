import Header from "./header";
import Decks from "./deck/decks";
import { useStore } from "@/lib/store";
import Cards from "./card/cards";

const Feed = () => {
  const user = useStore((state) => state.user);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
      <Header />
      {user ? (
        selectedDeckId ? (
          <Cards />
        ) : (
          <Decks />
        )
      ) : (
        <div className="flex justify-center items-center h-screen">
          Please login to view your cards or register to use this app.
        </div>
      )}
    </div>
  );
};

export default Feed;
