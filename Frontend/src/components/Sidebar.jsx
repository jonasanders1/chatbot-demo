/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
// Styles
import "../assets/styles/components/sidebar.css";
// Colors
import { colors } from "../assets/styles/colors";
// Icons
import { RiExpandRightLine } from "react-icons/ri";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle menu
  const handleSidebarMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`${isSidebarOpen ? "sidebar" : "bar"}`}>
      {isSidebarOpen ? (
        <div className="sidebar-content">
          <div className="sidebar-header">
            <button
              className="close-sidebar-menu sidebar-button"
              onClick={handleSidebarMenu}
            >
              <RiExpandRightLine
                style={{ transform: "rotate(180deg)" }}
                className="expand-icon"
                size={30}
              />
            </button>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <button className="go-back-btn">
                <span className="go-back-btn-text">Configure new bot</span>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bar">
          <button
            className="open-sidebar-menu sidebar-button"
            onClick={handleSidebarMenu}
          >
            <RiExpandRightLine className="expand-icon" size={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
