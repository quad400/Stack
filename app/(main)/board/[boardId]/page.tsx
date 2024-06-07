import Image from "next/image";

import { getBoardById } from "@/lib/actions/board-action";
import BoardContent from "@/components/board/board-content";
import BoardHeader from "@/components/board/board-header";

interface BoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const board = await getBoardById(params.boardId);

  return (
    <div className="relative h-full w-full">
      <Image
        alt={board.name}
        src={board.imageUri}
        fill
        className="object-cover -z-10"
      />
      <BoardHeader name={board.name} />
      <BoardContent boardId={JSON.parse(JSON.stringify(board._id))} />
    </div>
  );
};

export default BoardIdPage;
