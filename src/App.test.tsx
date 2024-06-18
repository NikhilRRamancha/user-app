import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import App from './App';
import userSlice from './store/user/User.slice';
import rootSaga from './store/root.saga';
import store from './store';
import { fetchUsers, fetchUsersFailure, fetchUsersSuccess } from './store/user/User.slice';
import { users } from './mockData/mockData';
jest.mock('axios');

describe('Integration Test for App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should display data when API call is successful', async () => {
    const mockResponse = { data: {data: {users}} };
    (axios.get as jest.Mock).mockResolvedValue( mockResponse );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    store.dispatch(fetchUsers());

    await waitFor(() => {
      expect(screen.getByText(users[0].username)).toBeInTheDocument();
    });
  });
});
