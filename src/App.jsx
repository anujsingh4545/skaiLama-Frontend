import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layput/AppLayout";
import AuthPage from "./pages/AuthPage";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import AddPodcast from "./components/DashBoard/AddPodcast";
import UpcomingComp from "./components/DashBoard/UpcomingComp";
import NotFoundPage from "./pages/NotFoundPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { findUser } from "./redux/thunk/userThunk";
import ProtectedRoute from "./layput/ProtectedRoute";
import PublicOnlyRoute from "./layput/PublicRoute";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path:"/",
        element: <ProtectedRoute><Projects/></ProtectedRoute>,
      },
      {
        path:"/signin",
        element: <PublicOnlyRoute><AuthPage mode={"signin"}/></PublicOnlyRoute>,
      },
      {
        path:"/signup",
        element: <PublicOnlyRoute><AuthPage mode={"signup"}/></PublicOnlyRoute>
      },
      {
        path : "/:projectName",
        element : <ProtectedRoute><Dashboard/></ProtectedRoute>,
        children:[
          {
            path:"add-podcast",
            element: <AddPodcast/>
          },
          {
            path: "create-repurpose",
            element : <UpcomingComp/>
          },
          {
            path:"podcast-widget",
            element: <UpcomingComp/>
          },
          {
            path: "upgrade",
            element : <UpcomingComp/>
          }
        ]
      },
      {
        path: "*", 
        element: <NotFoundPage />, 
      },
    ]
  }
]);

function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(findUser())
  },[dispatch])

  return <RouterProvider router={router} />
}

export default App
