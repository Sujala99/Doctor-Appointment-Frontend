import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./core/public/Home"));
const Login = lazy(() => import("./core/public/Login"));
const Register = lazy(() => import("./core/public/Register"));

function App() {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
      errorElement: <>Error</>,
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Register />
        </Suspense>
      ),
    },
    { path: "*", element: <>Unauthorized</> },
  ];

  return (
    <RouterProvider router={createBrowserRouter(publicRoutes)} />
  );
}

export default App;
