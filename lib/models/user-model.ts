import { Schema, model, models } from "mongoose";
import { IUser } from "../interfaces/user-interface";
import { Types } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
    workspaces: {
      type: [Types.ObjectId],
      ref: "Workspace",
    },
  },
  { timestamps: true }
);

const User = models?.User || model("User", userSchema);

export default User;
