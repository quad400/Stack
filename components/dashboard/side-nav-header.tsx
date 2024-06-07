"use client"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const SideNavHeader = () => {

    const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between">
      <div className="text-base md:text-lg font-bold text-neutral-900">
        Workspace
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onOpen("createWorkspace")}
      >
        <Plus className="h-6 w-6 text-neutral-900" />
      </Button>
    </div>
  );
};

export default SideNavHeader;
