"use client"

import { useModal } from "@/hooks/use-modal-store";



const CreateBoardButton = () => {


    const {onOpen} = useModal()
  return (
    <button onClick={()=> onOpen("createBoard")} className="bg-neutral-100 hover:bg-neutral-200/80 shadow-sm rounded-lg h-[150px] w-[250px]">
      <div className="text-neutral-900 font-medium text-sm">
        Create new board
      </div>
      <div className="text-neutral-900 font-normal text-xs">2 remaining</div>
    </button>
  );
};

export default CreateBoardButton;
