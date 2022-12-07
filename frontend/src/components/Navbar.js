import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
// import ReorderIcon from "icons-material";
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="" style={{ width: "100px", height: "70px" }} />
        <div className="hiddenLinks">
          <Link to="/login"> login </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/login"> login </Link>
        <button onClick={toggleNavbar}>{/* <ReorderIcon /> */}</button>
      </div>
    </div>
  );
}

export default Navbar;
