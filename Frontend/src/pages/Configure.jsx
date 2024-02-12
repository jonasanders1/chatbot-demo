/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/configure.css";
const Page = () => {
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameIsFocused, setCompanyNameIsFocused] = useState(false);
  const [companyURLIsFocused, setCompanyURLIsFocused] = useState(false);

  const handleNameInputFocus = () => {
    setCompanyNameIsFocused(true);
    setCompanyURLIsFocused(false);
  };
  const handleURLInputFocus = () => {
    setCompanyURLIsFocused(true);
    setCompanyNameIsFocused(false);
  };

  const handleCompanyInfo = async (e) => {
    // e.preventDefault();

    // const companyInfo = {
    //   company_url: companyUrl,
    //   company_name: companyName,
    // };

    // try {
    //   await fetch("http://localhost:5000/input", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ companyInfo }),
    //   });
    //   console.log(JSON.stringify({ companyInfo }));
    // } catch (error) {
    //   console.error("Error:", error);
    // }
    console.log("Bot Configured");
  };

  return (
    <div className="container">
      <form onSubmit={handleCompanyInfo} className="configure-form">
        <div className="field">
          <label
            className={`configure-label ${
              companyURLIsFocused ? "" : "input-focused"
            } `}
          >
            Company URL
          </label>
          <input
            onFocus={handleNameInputFocus}
            className="configure-input"
            type="text"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
          />
        </div>
        <div className="field">
          <label
            className={`configure-label ${
              companyNameIsFocused ? "" : "input-focused"
            }`}
          >
            Company Name
          </label>
          <input
            onFocus={handleURLInputFocus}
            className="configure-input"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <button className="configure-btn" type="submit">
          Configure bot
        </button>

        <Link to={"/chat"} className="button-wrapper">
          <button className="configure-btn">Go to bot</button>
        </Link>
      </form>
    </div>
  );
};

export default Page;
