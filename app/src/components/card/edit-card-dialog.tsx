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
import useMutationCards from "@/hooks/use-mutation-cards";

export const EditCardDialog = ({
  id,
  currentFront,
  currentBack,
}: {
  id: string;
  currentFront: string;
  currentBack: string;
}) => {
  let [front, setFront] = useState(currentFront);
  let [back, setBack] = useState(currentBack);
  const { editCardById } = useMutationCards();

  const handleSave = async () => {
    if (front.trim() === "" || back.trim() === "") {
      toast({
        variant: "destructive",
        title: "Sorry! The input cannot be empty 😞",
        description: "Please enter an input for your deck",
      });

      front = currentFront; // Prevent saving when the title is empty
      back = currentBack;
    }
    await editCardById(id, front, back);
    setFront(front);
    setBack(back);
  };

  const handleCancel = () => {
    setFront(currentFront);
    setBack(currentBack);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Deck</DialogTitle>
        <DialogDescription>Edit the title of your deck here.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid items-center grid-cols-4 gap-4">
          <Label className="text-right">Front</Label>
          <Input
            id="front"
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
            value={back}
            className="col-span-3"
            onChange={(e) => {
              setBack(e.target.value);
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
