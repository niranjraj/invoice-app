import React from "react";
import WaitState from "./WaitState";
import Logo from "../../assets/images/logo.svg";
import moonIcon from "../../assets/images/icon-moon.svg";
import { m, AnimatePresence } from "framer-motion";
import LazyAnimate from "./LazyAnimate";
import sunIcon from "../../assets/images/icon-sun.svg";
import Button from "./Button";
import "./Sidebar.css";
import Avatar from "../../assets/images/Avatar.svg";
import { greetingMsg } from "../../utils/greeting";
import { useAuth } from "../../contexts/AuthContext";

let popUpVariant = {
  hidden: (i) => ({
    scale: 0.2,
    originX: i ? 0.8 : 0.2,
  }),
  visible: (i) => ({
    scale: 1,
    originX: i ? 0.2 : 1,
    transition: {
      type: "easeOut",
      duration: 0.3,
    },
  }),
  exit: (i) => ({
    scale: 0.2,
    originX: i ? 0.8 : 0.2,
    transition: {
      type: "easeOut",
      duration: 0.3,
    },
  }),
};
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
        <img
          src={Logo}
          alt="logo"
          height="37"
          width="40"
          className="logo-img"
        />{" "}
      </div>
      <Button
        buttonSize="small"
        buttonStyle="theme-btn"
        iconValue={lightTheme ? moonIcon : sunIcon}
        altValue={lightTheme ? "moonIcon" : "sunIcon"}
        onClick={toggleClick}
      />
      <div className="avatar-img-wrapper">
        <img
          className="avatar-img"
          src={user ? user.photoURL : Avatar}
          alt="AvatrImg"
          height="40"
          width="40"
          onClick={togglePop}
        />
        <AnimatePresence>
          {popIsOpen && (
            <LazyAnimate>
              {" "}
              <m.div
                variants={popUpVariant}
                initial="hidden"
                animate="visible"
                custom={window.innerWidth < 1100}
                exit="exit"
                key="popIsOpen"
                className="pop-logout"
              >
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
              </m.div>
            </LazyAnimate>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}

export default Sidebar;
