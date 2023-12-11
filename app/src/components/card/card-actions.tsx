import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { EditCardDialog } from "./edit-card-dialog";
import { Card } from "@/lib/types";
import useMutationCards from "@/hooks/use-mutation-cards";

const CardActions = ({ card }: { card: Card }) => {
  const { id, front, back } = card;
  const { removeCardById } = useMutationCards();

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
            onClick={() => removeCardById(id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditCardDialog id={id} currentFront={front} currentBack={back} />
    </Dialog>
  );
};

export default CardActions;
