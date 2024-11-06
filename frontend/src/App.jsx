import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/layout";
import HomePage from "./routes/homePage";
import Register from "./routes/register";
import Login from "./routes/login";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;