import React from "react";
import WaitState from "./WaitState";
import Logo from "../../assets/images/logo.svg";
import moonIcon from "../../assets/images/icon-moon.svg";
import sunIcon from "../../assets/images/icon-sun.svg";
import Button from "./Button";
import "./Sidebar.css";
import Avatar from "../../assets/images/Avatar.svg";
import { greetingMsg } from "../../utils/Greeting";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar({ setLightTheme, lightTheme, popIsOpen, setPopIsOpen }) {
  const { user, logout, wait, setWait } = useAuth();

  const togglePop = () => {
    if (user) {
      setPopIsOpen((prev) => !prev);
    }
  };
  const toggleClick = () => {
    // toggle between the themes
    setLightTheme((prev) => !prev);
  };

  const handleLogout = async () => {
    console.log("in logout");
    if (user) {
      setWait(true);
      await logout();
      setWait(false);
      setPopIsOpen(false);
    }
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
        alt={lightTheme? "moonIcon":"sunIcon"}
        onClick={toggleClick}
      />
      <div className="avatar-img-wrapper">
        <img
          className="avatar-img"
          src={user ? user.photoURL : Avatar}
          alt="AvatrImg"
          onClick={togglePop}
        />
        <div className={`pop-logout ${popIsOpen ? "logout-open" : ""}`}>
          <h1 className="greeting-logout">{`${greetingMsg()} ${
            user ? user.displayName : ""
          }. Would you like to sign out? `}</h1>
          <Button
            buttonSize="large"
            buttonStyle="sign-out-btn"
            onClick={handleLogout}
            disabled={wait}
          >
            {wait ? <WaitState /> : "Signout"}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
