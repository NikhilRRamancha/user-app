import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { UserPage } from '../containers/userPage/UserPage';
import { users } from '../mockData/mockData';


describe('User Page', () => {

const middlewares: any[] = [];

const mockStore = configureStore(middlewares)


test('Renders UserPage', () => {
    const initialState = {
        userSlice: {
            users: [users[0]]}
        };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
          <UserPage />
      </Provider >
    );
    expect(screen.getByText(/nberwick0/i)).toBeInTheDocument();
  });

test('Renders loader component', () => {
  const initialState = {
      userSlice: {
          loading: true}
      };
      const store = mockStore(initialState)
  render(
    <Provider store = { store } >
        <UserPage />
    </Provider >
  );
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});


  test('Renders pagination when items are greater than 10', () => {
    const initialState = {
        userSlice: {
            users: users
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    expect(screen.getByTestId("items-per-page-select")).toBeInTheDocument();
  });

  test('Renders 10 ites per page', () => {
    const initialState = {
        userSlice: {
            users: users
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    expect(screen.getAllByTestId("user-card")).toHaveLength(10);
  });

  test('Renders 20 items per page', async() => {
    const initialState = {
        userSlice: {
            users: users
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    const dropdown = within(await screen.findByTestId("items-per-page-select")).getByRole(
      "combobox",
    );
    await userEvent.click(dropdown);

    expect(
      await screen.findByRole("option", { name: "Twenty" }),
    ).toBeInTheDocument();
    await userEvent.click(await screen.findByRole("option", { name: "Twenty" }));
    expect(screen.getAllByTestId("user-card")).toHaveLength(20);
  });

  test('Renders second page', async() => {
    const initialState = {
        userSlice: {
            users: users
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    expect(await screen.findByRole("navigation")).toBeInTheDocument();
    const secondPage = await screen.findByRole("button", {
      name: "Go to page 2",
    });
    await userEvent.click(secondPage);
    expect(screen.getByText(users[11].username)).toBeInTheDocument();
  });


  test('Render No User Found', async() => {
    const initialState = {
        userSlice: {
            users: []
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  test('Render Modal when user has been seleted', async() => {
    const initialState = {
        userSlice: {
            users: users,
            user: users[0]
        }
    };
        const store = mockStore(initialState)
    render(
      <Provider store = { store } >
            <UserPage />
      </Provider >
    );
    expect(screen.getByTestId("user-modal")).toBeInTheDocument();
    expect(screen.getByText("Subcontractor")).toBeInTheDocument();
  });
});