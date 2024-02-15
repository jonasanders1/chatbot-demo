/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/configure.css";
import { ThemeContext } from "../main";

const Page = () => {
  const [isFormValid, setIsFormValid] = useState(false);

  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/i;
  useEffect(() => {
    const isUrlValid = urlPattern.test(companyUrl); // does the companyURL fulfill the claims
    const isCompanyNameValid = !!companyName; // companyName is not empty

    setIsFormValid(isUrlValid && isCompanyNameValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyName, companyUrl]);

  const handleCompanyInfo = async (e) => {
    e.preventDefault();

    const companyInfo = {
      company_url: companyUrl,
      company_name: companyName,
    };

    try {
      await fetch("http://localhost:5000/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyInfo }),
      });
      console.log(JSON.stringify({ companyInfo }));
    } catch (error) {
      console.error("Error:", error);
    }
    console.log("Bot Configured");
  };

  return (
    <div className="container configure-container">
      <div className="text-container">
        <h1 className="title">Demo chatbot</h1>
        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis dolore
          corporis animi explicabo nulla, fugit quidem atque assumenda
          exercitationem pariatur.
        </p>
        <br />
        <p className="text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis dolore
          corporis animi explicabo nulla, fugit quidem atque assumenda
          exercitationem pariatur.
        </p>
      </div>
      <div className="configure-form">
        <form onSubmit={handleCompanyInfo}>
          <div className="input-container">
            <div className="field">
              <label>Company URL</label>
              <input
                className="configure-input"
                type="text"
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Company Name</label>
              <input
                className="configure-input"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>
          <Link to={"/chat"} className="button-wrapper">
            <button
              className={`configure-btn ${isFormValid ? "valid" : "invalid"}`}
              type="submit"
              disabled={!isFormValid}
            >
              Configure bot
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
