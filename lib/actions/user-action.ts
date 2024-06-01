import { connect } from "../db";
import { IUser } from "../interfaces/user-interface";
import User from "../models/user-model";

export const createUser = async (user: IUser) => {
  try {
    await connect();
    const newUser = await User.create(user);
    return newUser;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
