import { connect } from "../db";
import { Board } from "../models/workspace-model";
import { validateId } from "../utils";

export const getBoards = async (workspaceId: string) => {
  await connect();

  if (!workspaceId) {
    return [];
  }
  const boards = await Board.find({ workspace: workspaceId });

  if (!boards) {
    return [];
  }

  return boards;
};

export const getBoardById = async (boardId: string) => {
  await connect();

  validateId(boardId);

  const board = await Board.findById(boardId);

  if (!board) {
    return null;
  }

  return board;
};
