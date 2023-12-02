import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./add-deck-dialog";
import { toast } from "./ui/use-toast";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-2 p-4">
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
      <AddDeckDialog />
    </div>
  );
};

export default Sidebar;
