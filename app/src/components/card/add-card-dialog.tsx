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
import useMutationCards from "@/hooks/use-mutation-cards";
import { useToast } from "../ui/use-toast";
import { useStore } from "@/lib/store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const AddCardDialog = () => {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { addNewCard } = useMutationCards();
  const { toast } = useToast();
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (front.trim() === "" || back.trim() === "") {
      toast({
        variant: "destructive",
        title: "Sorry! The input cannot be empty 😞",
        description: "Please enter an input for your Card",
      });

      return; // Prevent saving when the title is empty
    }
    await addNewCard(front, back);
    setFront("");
    setBack("");
  };

  const handleCancel = () => {
    setFront("");
    setBack("");
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
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your card here."
              : "Please login to make a card."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label className="text-right">Front</Label>
              <Input
                id="front"
                placeholder="front"
                value={front}
                className="col-span-3"
                onChange={(e) => {
                  setFront(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Back</Label>
              <Input
                id="back"
                placeholder="back"
                value={back}
                className="col-span-3"
                onChange={(e) => {
                  setBack(e.target.value);
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
