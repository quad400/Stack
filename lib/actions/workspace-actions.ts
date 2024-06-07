import { connect } from "../db";
import { getUser } from "./user-action";
import { Workspace } from "../models/workspace-model";
import { redirect } from "next/navigation";

export const getWorkspaces = async () => {
  await connect();
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const workspaces = await Workspace.find({ createdBy: user?._id });

  return workspaces;
};

export const getWorkspace = async (workspaceId: string) => {
  await connect();

  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const workspace = await Workspace.findById(workspaceId);

  return workspace;
};
