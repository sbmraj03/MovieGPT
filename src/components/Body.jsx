import Login from "./Login"
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

const Body = () => {
  const dispatch = useDispatch(); // hook to dispatch redux actions

  // Defining routes for the app
  const appRouter = createBrowserRouter([
    {
      path: "/",
      Component: Login,
    },
    {
      path: "/browse",
      Component: Browse,
    },
  ]);

  return (
    <div> 
      <RouterProvider router={appRouter} /> {/* Provides routing to the app */}
    </div>
  )
}

export default Body
