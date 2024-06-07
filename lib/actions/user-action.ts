import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


import { connect } from "../db";
import User from "../models/user-model";
import { IUser } from "../interfaces/user-interface";

export const createUser = async (user: IUser) => {
  try {
    await connect();
    const newUser = await User.create(user);
    return newUser;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export const getUser = async () => {
  const { userId } = auth();

  await connect();
  const user = await User.findOne({ userId: userId });
  
  if (!user) {
    return redirect("/sign-in");
  }

  return user;
};
