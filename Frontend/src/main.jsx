import * as React from "react";
import * as ReactDOM from "react-dom/client";
import '../src/index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



// Pages
import Configure from './pages/Configure'
import Chatbot from './pages/Chatbot'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Configure/>,
  },
  {
    path: "/chat",
    element: <Chatbot/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);