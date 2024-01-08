import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/pages/layout";
import LoginPage from "@/pages/login";
import { AuthRoute } from "@/components/AuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <BasicLayout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
