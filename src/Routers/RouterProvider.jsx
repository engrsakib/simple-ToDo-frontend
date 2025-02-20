import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import LogIn from "../auth/LogIn";
import Register from "./Register";
import Fourzero from "../components/Fourzero";
import Public from "./Public";
import Profile from "../pages/Profile";
import Privete from "./Privete";
import Dashboard from "../components/Dashboard/Dashboard";
import User from "../components/Dashboard/user/User";
import DashboardHome from "../components/Dashboard/DashboardHome";
import UserEdit from "../components/Dashboard/user/UserEdit";
import AllUsers from "../components/Dashboard/user/AllUsers/AllUsers";
import Admin from "./Admin";
import CreateDonations from "../components/Dashboard/Donor/CreateDonations";
import MyDonations from "../components/Dashboard/Donor/MyDonations";
import MyDonationEidit from "../components/Dashboard/Donor/MyDonationEidit";
import Details from "../components/Dashboard/Donor/Details";
import AllDonations from "../components/Dashboard/Donor/AllDonations";
import AllDonationsHome from "../components/Dashboard/Donor/AllDonationsHome";
import Blogs from "../components/Dashboard/Donor/Blogs";
import CreateBlogs from "../components/Dashboard/Donor/CreateBlogs";
import ContentManagement from "../components/Dashboard/admin/ContentManagement";
import BlogsDetials from "../components/Dashboard/Donor/BlogsDetials";
import Search from "../components/Dashboard/Donor/Search";
import Foundme from "../components/Dashboard/user/AllUsers/Foundme";
import AddFund from "../components/Dashboard/user/AllUsers/AddFund";

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
