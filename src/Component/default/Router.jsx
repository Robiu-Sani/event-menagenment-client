import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Error from "./Error";
import HomePage from "../pages/Home/HomePage";
import EventPage from "../pages/events/EventPage";
import AddEventPage from "../pages/add-event/AddEventPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import MyEvents from "../pages/my-events/MyEvents";
import Profile from "../pages/my-events/Profile";
import EditEvents from "../pages/my-events/EditEvents";
import Private from "./Private";

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
        element: (
          <Private>
            <EventPage />
          </Private>
        ),
      },
      {
        path: "/add-event",
        element: (
          <Private>
            <AddEventPage />
          </Private>
        ),
      },
      {
        path: "/my-events",
        element: (
          <Private>
            <MyEvents />
          </Private>
        ),
      },
      {
        path: "/edit-event/:id",
        element: (
          <Private>
            <EditEvents />
          </Private>
        ),
      },
      {
        path: "/profile",
        element: (
          <Private>
            <Profile />
          </Private>
        ),
      },
    ],
  },
]);
