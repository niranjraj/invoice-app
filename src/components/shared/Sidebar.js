import React from 'react'
import Logo from '../../assets/images/logo.svg';
import Button from './Button';
import './Sidebar.css';
import Avatar from '../../assets/images/avatar.png';
import {useAuth} from '../../contexts/AuthContext';

const moonIcon=<i className="fas fa-moon" ></i>;
const sunIcon=<i className="fas fa-sun"></i>;

function Sidebar({setLightTheme}) {
    const {logout}=useAuth()
  
    const toggleClick = () => {
        // open and close the dropdown
        setLightTheme(prev=>!prev)
      };
    
  
    return (
        <aside className="sidebar-wrapper">
            <div className="logo-wrapper"> <img src={Logo} alt="logo" className="logo-img" /> </div>
            <Button buttonSize="small" iconValue={moonIcon} onClick={toggleClick} />
            <div className="divider"></div>
            <Button buttonSize="small" onClick={logout}> <img src={Avatar} alt="Avatar" className="avatar-img" /> </Button>
        </aside>
    )
}

export default Sidebar
