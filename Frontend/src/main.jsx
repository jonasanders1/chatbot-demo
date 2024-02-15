import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "../src/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Configure from "./pages/Configure";
import Chatbot from "./pages/Chatbot";

// Create a context for the theme
const ThemeContext = React.createContext();

// Define your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Configure />,
  },
  {
    path: "/chat",
    element: <Chatbot />,
  },
]);

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Toggle function to switch between light and dark mode
  const toggleTheme = (e) => {
    e.preventDefault()
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

export { ThemeContext };
