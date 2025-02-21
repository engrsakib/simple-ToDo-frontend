import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import LogIn from "../auth/LogIn";
import Register from "./Register";
import Fourzero from "../components/Fourzero";
import Public from "./Public";
import Privete from "./Privete";
import Dashboard from "../components/Dashboard/Dashboard";
import User from "../components/Dashboard/user/User";
import UserEdit from "../components/Dashboard/user/UserEdit";
import AddTask from "../components/Task/AddTask";
import EditTask from "../components/Task/EditTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Fourzero></Fourzero>,
    children: [
      {
        path: "/",
        element: <Privete><Home></Home></Privete>,
      },
      {
        path: "/add-Task",
        element: <Privete><AddTask></AddTask></Privete>,
      },
      {
        path: "/edit-Task",
        element: <Privete><EditTask></EditTask></Privete>,
      },
      
    ],
    
  },
  // dashboard work
  {
    path: "/dashboard",
    element: (
      <Privete>
        <Dashboard></Dashboard>
      </Privete>
    ),
    children: [
      
      {
        path: "/dashboard/profile",
        element: (
          <Privete>
            <User></User>
          </Privete>
        ),
      },
      {
        path: "/dashboard/profile/edit",
        element: (
          <Privete>
            <UserEdit></UserEdit>
          </Privete>
        ),
      },
    ],
  },
  // credentials work
  {
    path: "/auth/login",
    element: (
      <Public>
        <LogIn></LogIn>
      </Public>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <Public>
        <Register></Register>
      </Public>
    ),
  },
]);

export default router;
