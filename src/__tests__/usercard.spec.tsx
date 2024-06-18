import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { users } from '../mockData/mockData';
import UserCard from '../components/userCard/UserCard';


describe('User Card', () => {

const middlewares: any[] = [];

const mockStore = configureStore(middlewares)


test('Renders UserCard', async() => {
    const initialState = {
        userSlice: {
            users: [users[0]]}
        };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
          <UserCard user={users[0]}/>
      </Provider >
    );
    expect(screen.getByText(/nberwick0/i)).toBeInTheDocument();
    await userEvent.click(await screen.findByRole("button", { name: "View More" }));

  });
});