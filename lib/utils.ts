import { type ClassValue, clsx } from "clsx";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateId(id: any) {
  const isValid = Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new NextResponse("Invalid Id", { status: 400 });
  }
}
