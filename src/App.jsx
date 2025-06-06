import { useEffect } from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import YtoMp3 from "./pages/YtoMp3";
import ErrorPage from "./pages/ErrorPage";
import Clarity from '@microsoft/clarity';
const projectId = "rv61d21r2n"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Home />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/yt-mp3"
        element={<YtoMp3 />}
      />
    </>
  )
);
export default function App() {
useEffect(() => {
    Clarity.init(projectId);
  }, [])

  return (
    <RouterProvider router={router} />
  )
}
