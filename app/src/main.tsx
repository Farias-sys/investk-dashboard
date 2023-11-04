import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Dashboard.tsx';
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx';
import UserProvider from './context/UserContext.tsx';
import InvestmentsProvider from './context/InvestmentsContext.tsx';
import BanksProvider from './context/BanksContext.tsx';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <InvestmentsProvider>
        <BanksProvider>
          <RouterProvider router={router} />
        </BanksProvider>
      </InvestmentsProvider>
    </UserProvider>
  </React.StrictMode>,
)
