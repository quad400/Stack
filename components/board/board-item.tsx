"use client"

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface BoardItemProps {
  name: string;
  boardId: string;
  imageUri: string;
}

const BoardItem = ({ imageUri, name, boardId }: BoardItemProps) => {
  const router = useRouter();
  
  return (
    <button
      onClick={() => router.push(`/board/${boardId}`)}
      className="relative shadow-sm rounded-lg h-[150px] w-[250px]"
    >
      <div className="top-0 left-0 absolute w-full h-full z-20 bg-neutral-900 rounded-lg opacity-25" />
      <div className="text-lg font-semibold text-neutral-50 top-0 absolute left-0 p-2 z-50">
        {name}
      </div>
      <Image
        alt={name}
        src={imageUri}
        fill
        className="object-cover rounded-lg"
      />
    </button>
  );
};

export default BoardItem;
