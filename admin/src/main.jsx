import React from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import AddProject from './pages/AddProject.jsx';
import AddMember from './pages/AddMember.jsx';
import ManageProject from './pages/ManageProject.jsx';
import ManageMembers from './pages/ManageMembers.jsx';
import Index from './pages/index.jsx';
import Layout01 from './layout/Layout01.jsx';
import LoginPage from './pages/LoginPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout01 />,
    children: [
      { index: true, element: <Index /> },
      { path: "add-project", element: <AddProject /> },
      { path: "add-member", element: <AddMember /> },
      { path: "manage-project", element: <ManageProject /> },
      { path: "manage-members", element: <ManageMembers /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
