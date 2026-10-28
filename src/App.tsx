// import { useState } from "react";
// import heroImg from "./assets/hero.png";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/NotFound/Notfound";
import Layout from "./Layout/Layout";
import AuthContextProvider from "./context/AuthContext";
import ProtectedRoute from "./Componant/ProtectedRoute/ProtectedRoute";
import ProtectedLogin from "./Componant/ProtectedLogin/ProtectedLogin";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./Componant/PostDetails/PostDetails";
import { Toaster } from "react-hot-toast";
import {useNetworkState} from 'react-use';
import Offline from "./Componant/Offline/Offline";




const query = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "Login",
        element: (
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>
        ),
      },
      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "postdetails/:_id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "Register",
        element: (
          <ProtectedLogin>
            <Register />
          </ProtectedLogin>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0);

  const {online}= useNetworkState()
    // console.log(x);
    
  return (
    <>
      <h1 className="bg-red-400 text-center text-white text-3xl p-5">
        hallo social app
      </h1>
      {!online && 
      (<Offline />)}
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <Toaster />
          <RouterProvider router={router}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
