import React,{useState} from 'react'
import './Login.css'
import {motion,AnimatePresence} from 'framer-motion';
import Button from "../shared/Button";
import Backdrop from "../shared/Backdrop";
import LoginImg from "../../assets/images/login-img.svg";

import {useAuth} from "../../contexts/AuthContext";

function Login() {
    const googleIcon=<i className="fab fa-google"></i>
    const crossIcon =<i className="fas fa-times"></i>
    const [loginIsOpen,setLoginIsOpen]=useState(false);

    const {login,user,loading}= useAuth()

    return (

        <>
        <Backdrop formIsOpen={loginIsOpen} setFormIsOpen={setLoginIsOpen}/>
        <div className="login-wrapper">
            <AnimatePresence>
                {loginIsOpen && <motion.div className="login-modal">
                        <Button iconValue={crossIcon} onClick={()=>{setLoginIsOpen(false)}}/>
                        <h2>Login with Google Account</h2>
                        <div className="login-divider"></div>
                        <Button  buttonStyle="google-btn" iconValue={googleIcon} onClick={login} >Continue with Google</Button>
                    </motion.div>}
            </AnimatePresence>
            <img className="login-img" src={LoginImg} alt="loginImage" />
            <h2>There is nothing here</h2>
            {user && <h2>Im logged in</h2>}
            <p>You need to log in using google account to work with the invoices</p>
            <Button buttonStyle="save-send-btn" buttonSize="large" onClick={()=>{setLoginIsOpen(true)}}>Login</Button>
        </div>
        </>
    )
}

export default Login
