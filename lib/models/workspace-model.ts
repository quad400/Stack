import { Schema } from "mongoose";
import { IBoard, IMember, IWorkspace } from "../interfaces/workspace-interface";
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
  },
  { timestamps: true }
);

const memberSchema = new Schema<IMember>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Workspace =
  models?.Workspace || model("Workspace", workspaceSchema);
export const Board = models?.Board || model("Board", boardSchema);
export const Member = models?.Member || model("Member", memberSchema);
