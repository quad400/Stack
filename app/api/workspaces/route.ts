import { NextResponse } from "next/server";

import { connect } from "@/lib/db";
import { getUser } from "@/lib/actions/user-action";
import { Member, Workspace } from "@/lib/models/workspace-model";

export async function POST(req: Request) {
  try {
    await connect();

    const user = await getUser();

    const { name, imageUri } = await req.json();

    const isWorkspaceExist = await Workspace.findOne({ name: name });

    if (isWorkspaceExist) {
      return new NextResponse("Workspace already exists", { status: 400 });
    }

    const member = await Member.create({
      user: user._id,
      role: "admin",
    });

    const workspace = await Workspace.create({
      name: name,
      imageUri: imageUri,
      members: [member._id],
      createdBy: user._id,
    });

    user.workspaces.push(workspace._id);
    await user.save();

    return NextResponse.json(workspace);
  } catch (error: any) {
    console.log(error.response.data);
    return new NextResponse(error.response.data, error.response.status);
  }
}
