import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./deck/add-deck-dialog";
import { toast } from "./ui/use-toast";
import { useStore } from "@/lib/store";
import { AddCardDialog } from "./card/add-card-dialog";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);
  const selectedDeckId = useStore((state) => state.selectedDeckId);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2 p-4">
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => {
          clearSelectedDeckId();
          navigate("/");
        }}
      >
        <HomeIcon className="w-5 h-5" />
      </Button>
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Sorry! This option is not available yet 😞",
            description: "Please come back next time",
          });
        }}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {selectedDeckId ? <AddCardDialog /> : <AddDeckDialog />}
    </div>
  );
};

export default Sidebar;
