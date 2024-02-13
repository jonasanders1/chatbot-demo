/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/pages/configure.css";

const Page = () => {
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

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
    <div className="container configure-container">
      <div className="text-container">
        <h1>Demo chatbot</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis dolore
          corporis animi explicabo nulla, fugit quidem atque assumenda
          exercitationem pariatur.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis dolore
          corporis animi explicabo nulla, fugit quidem atque assumenda
          exercitationem pariatur.
        </p>
      </div>
      <form onSubmit={handleCompanyInfo} className="configure-form">
        <div className="field">
          <label>Company URL</label>
          <input
            type="text"
            value={companyUrl}
            onChange={(e) => setCompanyUrl(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        {/* <button className="configure-btn" type="submit">
          Configure bot
        </button> */}

        <Link to={"/chat"} className="button-wrapper">
          <button className="configure-btn">Configure Bot</button>
        </Link>
      </form>
    </div>
  );
};

export default Page;
