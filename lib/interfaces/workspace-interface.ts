import { IUser } from "./user-interface";

export interface IWorkspace {
    _id?: string;
    name: string;
    imageUri: string;
    boards: IBoard[];
    members: IMember[];
    createdBy: IUser;
}

export interface IMember {
    user: IUser;
    role: string;
}

export interface IBoard {
    name: string;
    imageUri: string;
    workspace: IWorkspace;
    lists: IList[]
}

export interface IList{
    name: string;
    board: IBoard;
    cards: ICard[]
}

export interface ICard{
    name: string;
    list: IList;
    description: string;
}