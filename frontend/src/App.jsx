import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./routes/layout";
import HomePage from "./routes/homePage";
import Register from "./routes/register";
import Login from "./routes/login";
import { snippetsLoader } from "./lib/loaders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <HomePage/>,
          loader: snippetsLoader,
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