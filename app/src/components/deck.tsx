import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Deck } from "@/lib/types";
import { Button } from "./ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { EditDeckDialog } from "./edit-deck-dialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Toaster } from "./ui/toaster";

const Deck = ({ deck }: { deck: Deck }) => {
  const { id, title, numberOfCards } = deck;
  const { removeDeckById } = useMutationDecks();

  return (
    <div className="flex justify-center p-4">
      <div className="relative h-60 w-4/5 p-4 mb-8">
        <div className="absolute w-full h-full bg-white shadow-lg p-4 transform translate-x-2 translate-y-2"></div>
        <div className="absolute w-full h-full bg-white shadow-lg transform translate-x-1 translate-y-1"></div>
        <div className="absolute w-full h-full bg-white shadow-lg">
          <div className="p-8">
            <div className="font-bold text-lg">{title}</div>
            <div className="text-base">{numberOfCards} cards</div>
          </div>
          <div className="absolute top-0 right-0 m-8">
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <DotsVerticalIcon className="flex" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DialogTrigger>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => removeDeckById(id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <EditDeckDialog id={id} currentTitle={title} />
              <Toaster />
            </Dialog>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default Deck;
