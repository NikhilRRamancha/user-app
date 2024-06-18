import { users } from "../mockData/mockData";
import userSlice, {fetchUsers, fetchUsersFailure, fetchUsersSuccess, selectUser} from "../store/user/User.slice";
import {IUserState, USERS} from '../store/user/User.types';

describe('userSlice reducer', () => {

test('should return the initial state', () => {
  expect(userSlice.reducer(undefined, { type: 'unknown' })).toEqual(
    {
        users: null,
        user: null,
        loading: false,
        error: '',
    }
  )
})

test('should handle a fetchuser', () => {
  const previousState: IUserState = {
    users: null,
    user: null,
    loading: false,
    error: '',
};

  expect(userSlice.reducer(previousState, fetchUsers())).toEqual(
    {
        users: null,
        user: null,
        loading: true,
        error: '',
    }
  )
})

test('should handle a fetchuserSuccess', () => {
    const previousState: IUserState = {
        users: null,
        user: null,
        loading: true,
        error: '',
    };
  
    expect(userSlice.reducer(previousState, fetchUsersSuccess([]))).toEqual(
      {
          users: [],
          user: null,
          loading: false,
          error: '',
      }
    )
  });

  test('should handle a fetchUsersFailure', () => {
    const previousState: IUserState = {
        users: null,
        user: null,
        loading: true,
        error: '',
    };
  
    expect(userSlice.reducer(previousState, fetchUsersFailure())).toEqual(
      {
          users: null,
          user: null,
          loading: false,
          error: 'Error while fetching users',
      }
    )
  });
  test('should handle a selectUser', () => {
    const previousState: IUserState = {
        users: null,
        user: null,
        loading: false,
        error: '',
    };
  
    expect(userSlice.reducer(previousState, selectUser(users[0]))).toEqual(
      {
          users: null,
          user: users[0],
          loading: false,
          error: '',
      }
    )
  })

});