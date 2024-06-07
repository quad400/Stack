import { getUser } from "@/lib/actions/user-action";
import { connect } from "@/lib/db";
import { Board, Workspace } from "@/lib/models/workspace-model";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    await connect();
    const { name, imageUri } = await req.json();
    const user = await getUser();
    const { searchParams } = new URL(req.url);

    const workspaceId = searchParams.get("workspaceId");

    if (!workspaceId) {
      throw new NextResponse("Missing workspace id", { status: 404 });
    }

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const board = await Board.create({
      name: name,
      imageUri: imageUri,
      workspace: workspaceId,
    });

    await Workspace.findByIdAndUpdate(
      workspaceId,
      { $push: { boards: board._id } },
      { new: true }
    );

    return NextResponse.json(board, { status: 201 });
  } catch (error: any) {
    throw new NextResponse(`ERROR CREATING BOARD ${error}`, {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    await connect();

    const body = await req.json();

    const user = await getUser();
    const { searchParams } = new URL(req.url);

    const boardId = searchParams.get("boardId");

    if (!boardId) {
      throw new NextResponse("Missing board id", { status: 404 });
    }

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        ...body,
      },
      { new: true }
    );

    return NextResponse.json(board, { status: 200 });
  } catch (error: any) {
    throw new NextResponse(`ERROR UPDATING BOARD ${error}`, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    await connect();

    const user = await getUser();
    const { searchParams } = new URL(req.url);

    const boardId = searchParams.get("boardId");

    if (!boardId) {
      throw new NextResponse("Missing board id", { status: 404 });
    }

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    await Board.findByIdAndDelete(boardId);

    return NextResponse.json("Successfully deleted", { status: 200 });
  } catch (error: any) {
    throw new NextResponse(`ERROR DELETING BOARD ${error}`, {
      status: 500,
    });
  }
}
