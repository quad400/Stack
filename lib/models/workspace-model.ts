import { Schema } from "mongoose";
import {
  IBoard,
  ICard,
  IList,
  IMember,
  IWorkspace,
} from "../interfaces/workspace-interface";
import { Types } from "mongoose";
import { model } from "mongoose";
import { models } from "mongoose";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
    boards: {
      type: [Types.ObjectId],
      ref: "Board",
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: [Types.ObjectId],
      ref: "Member",
    },
  },
  { timestamps: true }
);

const boardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
    workspace: {
      type: Types.ObjectId,
      ref: "Workspace",
    },
    lists: {
      type: [Types.ObjectId],
      ref: "List",
    },
  },
  { timestamps: true }
);

const listSchema = new Schema<IList>(
  {
    name: {
      type: String,
      required: true,
    },
    board: {
      type: Types.ObjectId,
      ref: "Board",
    },
    cards: {
      type: [Types.ObjectId],
      ref: "Card",
    },
  },
  { timestamps: true }
);

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    list: {
      type: Types.ObjectId,
      ref: "List",
    },
  },
  { timestamps: true }
);

export const Workspace =
  models?.Workspace || model("Workspace", workspaceSchema);
export const Board = models?.Board || model("Board", boardSchema);
// export const Member = models?.Member || model("Member", memberSchema);
export const List = models?.List || model("List", listSchema);
export const Card = models?.Card || model("Card", cardSchema);
