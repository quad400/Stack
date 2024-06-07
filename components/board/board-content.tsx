import { getLists } from "@/lib/actions/list-action";
import NewList from "../list/new-list";
import ListCard from "../list/list-card";

const BoardContent = async ({ boardId }: { boardId: string }) => {
  const lists = await getLists(boardId);
  return (
    <div className="mt-6 mx-8 flex flex-row justify-start items-start gap-4 flex-wrap">
      {lists.map((list) => (
        <ListCard
          key={list._id}
          name={list.name}
          id={JSON.parse(JSON.stringify(list._id))}
        />
      ))}
      <NewList />
    </div>
  );
};

export default BoardContent;
