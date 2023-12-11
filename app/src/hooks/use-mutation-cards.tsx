import { createCard, deleteCard, modifyCard } from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationCards() {
  const { toast } = useToast();

  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const editCard = useStore((state) => state.editCard);

  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const addNewCard = async (front: string, back: string) => {
    try {
      const newCard = await createCard(selectedDeckId as string, front, back);
      addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the comment",
        description:
          (error as Error).message ||
          "There was an error creating the comment. Please try again later.",
      });
    }
  };

  const removeCardById = async (cardId: string) => {
    try {
      await deleteCard(selectedDeckId as string, cardId); // api
      removeCard(cardId); // front-end
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const editCardById = async (cardId: string, front: string, back: string) => {
    try {
      await modifyCard(selectedDeckId as string, cardId, front, back); // api
      editCard(cardId, front, back);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit the deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please try again later.",
      });
    }
  };

  return { addNewCard, removeCardById, editCardById };
}

export default useMutationCards;
