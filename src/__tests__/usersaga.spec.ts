import { Saga, runSaga } from 'redux-saga';
import axios from "axios";
import {getUserSaga} from '../store/user/User.saga';
import { GET_USERS } from "../store/user/User.types";

import { fetchUsersFailure, fetchUsersSuccess } from '../store/user/User.slice';

jest.mock('axios');

describe('getUserSaga', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle success scenario', async () => {
    const mockResponse: {data: {users: User.IUser[]}} = { data: {users:[]} };
    const action = { type: GET_USERS };

    (axios.get as jest.Mock).mockResolvedValue({ data: mockResponse });

    const dispatched: any[] = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, getUserSaga as Saga, action).toPromise();

    expect(axios.get).toHaveBeenCalledWith('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
    expect(dispatched).toContainEqual(fetchUsersSuccess(mockResponse.data.users));
  });

  it('should handle failure scenario', async () => {
    const mockError = new Error('Network Error');
    const action = { type: GET_USERS };

    jest.spyOn(axios, 'get').mockRejectedValue(mockError);

    const dispatched:any[] = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, getUserSaga as Saga, action).toPromise();

    expect(axios.get).toHaveBeenCalledWith('https://9e06da9a-97cf-4701-adfc-9b9a5713bbb9.mock.pstmn.io/users');
    expect(dispatched).toContainEqual(fetchUsersFailure());
  });
});
