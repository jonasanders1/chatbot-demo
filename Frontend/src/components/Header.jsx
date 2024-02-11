/* eslint-disable no-unused-vars */
import { useState } from "react";

const Header = () => {
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleCompanyInfo = (e) => {
    e.preventDefault();
    console.table("Company Url:", companyUrl, "Company Name:", companyName);
  };
  return (
    <form onSubmit={handleCompanyInfo}>
      <input
        type="text"
        placeholder="Company URL..."
        onChange={(e) => setCompanyUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company Name..."
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <button type="submit">Configure bot</button>
    </form>
  );
};

export default Header;
