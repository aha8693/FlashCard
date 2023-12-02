import Header from "./header";
import Decks from "./decks";

const Feed = () => {
  return (
    <div className="flex flex-col w-full min-h-screen border-x-2 border-slate-400 md:max-w-xl">
      <Header />
      <Decks />
    </div>
  );
};

export default Feed;
