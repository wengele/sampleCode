import { createBrowserRouter } from "react-router-dom";

import SignUp from "../pages/signup";
import Login from "../pages/login";
import Home from "../pages/home";
import Layout from "../components/layout";
import EmployerPostedJobs from "../pages/employerPostedJobs";
import JobDetails from "../pages/jobDetails";
import Profile from "../pages/profile";

import JobPostingList from "../components/JobPostingList";
import AddJobs from "../pages/addJobs";
import EditJob from "../pages/editJob.";
import JobApplicationList from "../components/jobApplicationList";
import AdminDashborad from "../components/adminDashborad";
import AppliedJobsList from "../pages/appliedJobsList";
import NotApprovedPage from "../pages/notApprovedpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/jobDetails/:id",
    element: <JobDetails />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/jobs", element: <JobPostingList /> },
      { path: "/admin/Dashboard", element: <AdminDashborad /> },
      { path: "/employer/jobs", element: <EmployerPostedJobs /> },
      { path: "/employer/Addjobs", element: <AddJobs /> },
      { path: "/employer/Editjobs", element: <EditJob /> },
      { path: "/employer/viewJobs/:id", element: <JobApplicationList /> },
      { path: "/AppliedJobs", element: <AppliedJobsList /> },
      {
        path: "/jobEdit/:id",
        element: <JobDetails />,
      },

      { path: "/profile", element: <Profile /> },
    ],
  },
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <Login /> },
  { path: "/notApproved", element: <NotApprovedPage /> },
  { path: "*", element: <p>Invalid Route</p> },
]);

export default router;
