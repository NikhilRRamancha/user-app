import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Layout  from './layout';
import { RouterProvider , createBrowserRouter} from 'react-router-dom';
import { ErrorPage } from './containers/errorPage/ErrorPage';
import { UserPage } from './containers/userPage/UserPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children:[{
      path: "/",
      element: <UserPage />,
    },]
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
