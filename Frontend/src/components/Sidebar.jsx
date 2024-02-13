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
    <div
      className={`${isSidebarOpen ? "sidebar" : "bar"}`}
      style={
        isSidebarOpen
          ? { backgroundColor: colors.sidebarBackGroundColor }
          : { backgroundColor: colors.backgroundColor }
      }
    >
      {isSidebarOpen ? (
        <div className="sidebar-content">
          <div className="sidebar-header">
            <button
              className="close-sidebar-menu sidebar-button"
              onClick={handleSidebarMenu}
            >
              <RiExpandRightLine
                style={{ transform: "rotate(180deg)" }}
                color={colors.backgroundColor}
                size={25}
              />
            </button>

            <Link to={"/"} style={{ textDecoration: "none" }}>
              <button className="go-back-btn">
                <span
                  className="go-back-btn-text"
                  style={{ color: colors.sidebarSecondaryColor }}
                >
                  Configure new bot
                </span>
              </button>
            </Link>
          </div>
          <div className="footer">
            <h3 style={{ color: colors.backgroundColor }} className="brand">
              Andersen consulting
            </h3>
          </div>
        </div>
      ) : (
        <div className="bar">
          <button
            className="open-sidebar-menu sidebar-button"
            onClick={handleSidebarMenu}
          >
            <RiExpandRightLine
              color={colors.sidebarBackGroundColor}
              size={25}
            />
          </button>

          <div className="stacked-text">
            <h3 className="andersen">
              <span className="andersen-txt">A</span>
              <span className="andersen-txt">n</span>
              <span className="andersen-txt">d</span>
              <span className="andersen-txt">e</span>
              <span className="andersen-txt">r</span>
              <span className="andersen-txt">s</span>
              <span className="andersen-txt">e</span>
              <span className="andersen-txt">n</span>
            </h3>
            <h3 className="consulting">
              <span className="consulting-txt">C</span>
              <span className="consulting-txt">o</span>
              <span className="consulting-txt">n</span>
              <span className="consulting-txt">s</span>
              <span className="consulting-txt">u</span>
              <span className="consulting-txt">l</span>
              <span className="consulting-txt">t</span>
              <span className="consulting-txt">i</span>
              <span className="consulting-txt">n</span>
              <span className="consulting-txt">g</span>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
