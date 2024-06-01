import { IUser } from "./user-interface";

export interface IWorkspace {
    name: string;
    imageUri: string;
    boards: IBoard[];
    members: IMember[];
}

export interface IMember {
    user: IUser;
    role: string;
}

export interface IBoard {
    name: string;
    imageUri: string;
}