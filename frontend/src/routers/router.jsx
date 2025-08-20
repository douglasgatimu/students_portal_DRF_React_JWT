import { createBrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/auth/SignUpPage";
import SignInPage from "../pages/auth/SignInPage";
import App from "../App";
import ResetPassword from "../pages/auth/ResetPassword";
import PrivateRoute from "../layouts/PrivateRoute";
import MainLayout from "../layouts/MainLayout";
import SplitScreen from "../pages/marketing/SplitScreen";
import ContactPage from "../pages/marketing/ContactPage";
import About from "../pages/marketing/About";
import HomePage from "../pages/dashboard/DashboardOverview";
import AnnouncementsPage from "../pages/dashboard/AnnouncementsPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import CoursesPage from "../pages/dashboard/CoursesPage";
import LessonsPage from "../pages/dashboard/LessonsPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <SplitScreen />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/signin", element: <SignInPage /> },
      { path: "/reset-password", element: <ResetPassword /> },
      {
        path: "/dashboard",
        element: <PrivateRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardHome />,
              },
              {
                path: "courses",
                element: <CoursesPage />,
              },
              {
                path: "lessons",
                element: <LessonsPage />,
              },
              {
                path: "profile",
                element: <ProfilePage />,
              },
              {
                path: "announcements",
                element: <AnnouncementsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
