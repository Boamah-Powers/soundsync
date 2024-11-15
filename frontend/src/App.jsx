import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout";
import HomePage from "./routes/homePage";
import Register from "./routes/register";
import Login from "./routes/login";
import { snippetsLoader, snippetLoader } from "./lib/loaders";
import ProfilePage from "./routes/profilePage";
import SingleSnippetPage from "./routes/singleSnippetPage";

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
        },
        {
          path: "/snippet/:id",
          element: <SingleSnippetPage/>,
          loader: snippetLoader,
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