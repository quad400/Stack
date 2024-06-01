import { IWorkspace } from "./workspace-interface";


export interface IUser {
    userId: string;
    email: string;
    fullName: string;
    imageUri: string;
    workspaces?: IWorkspace[];
}

