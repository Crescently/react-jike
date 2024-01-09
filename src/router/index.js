import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/pages/layout";
import LoginPage from "@/pages/login";
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/home";
import Article from "@/pages/article";
import Publish from "@/pages/publish";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <BasicLayout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
