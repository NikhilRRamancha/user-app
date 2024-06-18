export type IUserState = {
    users: User.IUser[] | null;
    user: User.IUser | null;
    loading: boolean;
    error: string;
  }

export const USERS = "users";
export type USERS = typeof USERS; // Typescript line
  
export const GET_USERS = `${USERS}/fetchUsers`;;