import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout";
import HomePage from "./routes/homePage";
import Register from "./routes/register";
import Login from "./routes/login";
import { snippetsLoader } from "./lib/loaders";
import ProfilePage from "./routes/profilePage";

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
    },
    {
      path: "/",
      element: <RequireAuth/>,
      children: [
        {
          path: "/profile",
          element: <ProfilePage/>
        }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App;