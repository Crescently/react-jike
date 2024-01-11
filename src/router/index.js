import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "@/pages/layout";
import LoginPage from "@/pages/login";
import { AuthRoute } from "@/components/AuthRoute";
import { lazy, Suspense } from "react";

// 实现路由懒加载--使用lazy函数对组件进行导入
const Home = lazy(() => import("@/pages/home"));
const Article = lazy(() => import("@/pages/article"));
const Publish = lazy(() => import("@/pages/publish"));

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
        element: (
          <Suspense fallback={"加载中"}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "article",
        element: (
          <Suspense fallback={"加载中"}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: "publish",
        element: (
          <Suspense fallback={"加载中"}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
