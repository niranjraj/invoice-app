import React from "react";
import Logo from "../../assets/images/logo.svg";
import moonIcon from "../../assets/images/icon-moon.svg";
import sunIcon from "../../assets/images/icon-sun.svg";
import Button from "./Button";
import "./Sidebar.css";
import Avatar from "../../assets/images/Avatar.svg";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ setLightTheme, lightTheme }) {
  const { user,logout } = useAuth();

  const toggleClick = () => {
    // open and close the dropdown
    setLightTheme((prev) => !prev);
  };

  return (
    <aside className="sidebar-wrapper">
      <div className="logo-wrapper">
        {" "}
        <img src={Logo} alt="logo" className="logo-img" />{" "}
      </div>
      <Button
        buttonSize="small"
        iconValue={lightTheme ? moonIcon : sunIcon}
        alt="moonIcon"
        onClick={toggleClick}
      />
      <div className="divider"></div>
      <Button
        buttonSize="small"
        buttonStyle="avatar-img-btn"
        iconValue={user?user.photoURL:Avatar}
        alt="Avatar"
        onClick={logout}
      />
    </aside>
  );
}

export default Sidebar;
