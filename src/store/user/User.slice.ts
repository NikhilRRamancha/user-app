import { createSlice, configureStore,PayloadAction } from '@reduxjs/toolkit'
import {IUserState, USERS} from './User.types';


const usersInitialState: IUserState = {
    users: null,
    user: null,
    loading: false,
    error: '',
}

const userSlice = createSlice({
  name: USERS,
  initialState: usersInitialState,
  reducers: {
    fetchUsers: (state: IUserState) => ({
        ...state,
        loading: true
    }),
    fetchUsersSuccess: (state: IUserState,action: PayloadAction<User.IUser[]>) => ({
        ...state,
        users: action.payload,
        loading: false
    }),
    fetchUsersFailure: (state: IUserState) => ({
        ...state,
        loading: false,
        error: 'Error while fetching users',
    }),
    selectUser : (state: IUserState,action: PayloadAction<User.IUser | null>) => ({ 
        ...state,
        user: action.payload
     }),
  }
})

export const { fetchUsers, fetchUsersFailure, fetchUsersSuccess, selectUser } = userSlice.actions

export default userSlice;