import Image from "next/image";
import { CreditCard, UserRound } from "lucide-react";

import { getWorkspace } from "@/lib/actions/workspace-actions";
import { Separator } from "@/components/ui/separator";
import CreateBoardButton from "@/components/board/create-board-button";
import { getBoards } from "@/lib/actions/board-action";
import BoardItem from "@/components/board/board-item";

const WorkspaceIdPage = async ({
  params,
}: {
  params: { workspaceId: string };
}) => {
  const workspaceId = params.workspaceId;

  const workspace = await getWorkspace(workspaceId);

  const boards = await getBoards(workspaceId);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-start space-x-4 items-center">
        <div className="relative h-14 w-14">
          <Image
            fill
            alt={workspace?.name}
            src={workspace?.imageUri}
            className="rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-start items-start">
          <div className="text-lg font-semibold text-neutral-900">
            {workspace?.name}
          </div>
          <div className="flex flex-row justify-start items-center space-x-2">
            <CreditCard className="text-neutral-400 h-5 w-5" />
            <div className="text-neutral-400 text-sm font-normal">Free</div>
          </div>
        </div>
      </div>
      <Separator className="my-4 w-full" />
      <div className="flex flex-row space-x-2">
        <UserRound className="text-neutral-800 h-7 w-7" />
        <div className="text-lg font-semibold text-neutral-900">
          Your Boards
        </div>
      </div>
      <div className="gap-4 mt-4 flex justify-start items-center flex-wrap">
        {boards.map((board) => {
          return (
            <BoardItem
              key={board._id}
              name={board.name}
              boardId={JSON.parse(JSON.stringify(board._id))}
              imageUri={board.imageUri}
            />
          );
        })}

        <CreateBoardButton />
      </div>
    </div>
  );
};

export default WorkspaceIdPage;
