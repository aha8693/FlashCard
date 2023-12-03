import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import useMutationDecks from "@/hooks/use-mutation-decks";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import { useStore } from "@/lib/store";

export const AddDeckDialog = () => {
  const [newTitle, setContent] = useState("");
  const { addNewDeck } = useMutationDecks();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (newTitle.trim() === "") {
      toast({
        variant: "destructive",
        title: "Sorry! The title cannot be empty 😞",
        description: "Please enter a title for your deck",
      });

      return; // Prevent saving when the title is empty
    }
    await addNewDeck(newTitle);
    setContent("");
  };

  const handleCancel = () => {
    setContent("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a Post"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Deck</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your post here."
              : "Please login to make a post."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="Title"
                value={newTitle}
                className="col-span-3"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
