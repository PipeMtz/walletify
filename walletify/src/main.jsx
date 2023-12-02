import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route
} from "react-router-dom";
import DashboardPage from './DashboardPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import Home from './Home.jsx';
import Transactions from './Transactions.jsx';
import Profile from './Profile.jsx';
import Admin from './Admin.jsx';
import Login from './Login.jsx';

// Component for handling 404 errors
const NotFound = () => (
  <div>
    <h1>404 Not Found</h1>
    <p>The requested page could not be found.</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Dashboard",
    element: <Home />,
    children: [
      {
        path: "Home",
        element: <DashboardPage />,
      },
      {
        path: "walletId",
        element: <div>Wallet</div>,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "admin",
        element: <Admin />,
      }
    ],
  },
  {
    path: "/Register",
    element: <RegisterPage />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  // Catch-all route for handling 404 errors
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ width: '100%', height: '100vh' }}>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
