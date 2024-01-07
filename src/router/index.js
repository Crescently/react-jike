import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/pages/layout";
import LoginPage from "@/pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

export default router
