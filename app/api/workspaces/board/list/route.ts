import { getUser } from "@/lib/actions/user-action";
import { connect } from "@/lib/db";
import { Board, List } from "@/lib/models/workspace-model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connect();

    const { name } = await req.json();

    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId");

    const user = await getUser();

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    if (!boardId) {
      throw new NextResponse("Missing board id", { status: 404 });
    }

    const list = await List.create({
      name: name,
      board: boardId,
    });

    await Board.findByIdAndUpdate(
      boardId,
      {
        $push: { lists: list._id },
      },
      { new: true }
    );

    return NextResponse.json(list, { status: 201 });
  } catch (error: any) {
    throw new NextResponse(`ERROR CREATING LIST ${error}`, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  try {
    await connect();

    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId");
    const listId = searchParams.get("listId");

    const user = await getUser();

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    if (!boardId) {
      throw new NextResponse("Missing board id", { status: 404 });
    }
    const list = await List.findOne({
      _id: listId,
      board: boardId,
    });

    if (!list) {
      throw new NextResponse("List not found", { status: 404 });
    }

    await Board.findByIdAndUpdate(
      boardId,
      {
        $pull: { lists: list._id },
      },
      { new: true }
    );

    await list.deleteOne();

    return NextResponse.json("Successfully deleted", { status: 200 });
  } catch (error: any) {
    throw new NextResponse(`ERROR DELETING LIST ${error}`, {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    await connect();

    const body = await req.json();
    
    const { searchParams } = new URL(req.url);
    const listId = searchParams.get("listId");

    const user = await getUser();

    if (!user) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const list = await List.findByIdAndUpdate(listId, body, { new: true });

    if (!list) {
      throw new NextResponse("List not found", { status: 404 });
    }

    return NextResponse.json(list, { status: 200 });
  } catch (error: any) {
    throw new NextResponse(`ERROR DELETING LIST ${error}`, {
      status: 500,
    });
  }
}
