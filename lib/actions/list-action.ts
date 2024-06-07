import { connect } from "../db";
import { List } from "../models/workspace-model";

export const getLists = async (boardId: string) => {
  await connect();
  const lists = await List.find({ board: boardId }).populate("cards");

  if (!lists) {
    return [];
  }

  return lists;
};
