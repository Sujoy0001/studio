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
import ManagePostsPage from './pages/MannagePost.jsx';
import AddPostPage from './pages/AddPost.jsx';
import {
  ProtectRoute,
  AuthenticatedUserRoute
} from "./utils/userAuthenticated.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout01 />,
    children: [
      {
        index: true, element: (
          <ProtectRoute><Index /></ProtectRoute>
        )
      },
      {
        path: "add-project", element: (
          <ProtectRoute><AddProject /></ProtectRoute>
        )
      },
      {
        path: "add-member", element: (
          <ProtectRoute><AddMember /></ProtectRoute>
        )
      },
      {
        path: "manage-project", element: (
          <ProtectRoute><ManageProject /></ProtectRoute>
        )
      },
      {
        path: "manage-members", element: (
          <ProtectRoute><ManageMembers /></ProtectRoute>
        )
      },
      {
        path: "add-post", element: (
          <ProtectRoute><AddPostPage /></ProtectRoute>
        )
      },
      {
        path: "manage-post", element: (
          <ProtectRoute><ManagePostsPage /></ProtectRoute>
        )
      },
      { path: "login", element: (
        <AuthenticatedUserRoute><LoginPage /></AuthenticatedUserRoute>
      ) },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
