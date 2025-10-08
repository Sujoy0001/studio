import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout01 from "./layout/Layout01.jsx";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Services from "./pages/Services.jsx";
import App from "./App.jsx";
import Contact from "./pages/Contact.jsx";
import Project from "./pages/Project.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout01 />,
    children: [
      { index: true, element: <Home /> },
      { path: "service", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "project", element: <Project /> },
      { path: "project/:type/:id", element: <ProjectDetails /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "sujoy", element: <App /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);