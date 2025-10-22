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
import About from "./pages/About.jsx";
import Loader from "./components/Loading.jsx";
import TeamMember from "./pages/TeamMember.jsx";
import PostPage from "./pages/PostPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout01 />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "service", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "project", element: <Project /> },
      { path: "post", element: <PostPage /> },
      { path: "project/:type/:id", element: <ProjectDetails /> },
      { path: "/team/:name", element: <TeamMember /> },
      // { path: "loader", element: <Loader /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "sujoy", element: <App /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);