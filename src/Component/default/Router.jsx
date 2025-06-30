import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Error from "./Error";
import HomePage from "../pages/Home/HomePage";
import EventPage from "../pages/events/EventPage";
import AddEventPage from "../pages/add-event/AddEventPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/events",
        element: <EventPage />,
      },
      {
        path: "/add-event",
        element: <AddEventPage />,
      },
    ],
  },
]);
