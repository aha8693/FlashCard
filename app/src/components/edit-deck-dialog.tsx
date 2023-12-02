import useMutationDecks from "@/hooks/use-mutation-decks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export const EditDeckDialog = ({
  id,
  currentTitle,
}: {
  id: string;
  currentTitle: string;
}) => {
  const [title, setContent] = useState(currentTitle);
  const { editDeckById } = useMutationDecks();

  const handleSave = async () => {
    if (title.trim() === "") {
      toast({
        variant: "destructive",
        title: "Sorry! The title cannot be empty 😞",
        description: "Please enter a title for your deck",
      });

      return; // Prevent saving when the title is empty  
    }
    await editDeckById(id, title);
    setContent(title);
  };

  const handleCancel = () => {
    setContent(currentTitle);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Deck</DialogTitle>
        <DialogDescription>Edit the title of your deck here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            value={title}
            className="col-span-3"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"secondary"} type="reset" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
