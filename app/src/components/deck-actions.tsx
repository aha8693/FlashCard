import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { EditDeckDialog } from "./edit-deck-dialog";
import { useToast } from "./ui/use-toast";
import { Deck } from "@/lib/types";

const DeckActions = ({ deck }: { deck: Deck }) => {
  const { id, title, numberOfCards } = deck;
  const { removeDeckById } = useMutationDecks();
  const { toast } = useToast();

  return (
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
    </Dialog>
  );
};

export default DeckActions;
