import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routes/home";
import Landing from "./routes/home/Landing";
import Signup from "./routes/home/Signup";
import Login from "./routes/home/Login";
import Root from "./routes/dashboard";
import Dashboard from "./routes/dashboard/Dashboard";
import Profile from "./routes/dashboard/Profile";
import Professions from "./routes/home/Professions";
import Account from "./routes/dashboard/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "professions",
        element: <Professions />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: ":userId",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
