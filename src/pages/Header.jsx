import React, { useEffect, useState } from "react";
import styles from './header.module.css';
import { useNavigate } from "react-router-dom";

const Header=()=>{
    const [user,setUser]=useState(null);
    const navigate=useNavigate();
    const handleLoginClick=()=>{
        navigate('/Login')
    }
    const handleRegisterClick=()=>{
        navigate('/Register')
    }
    useEffect(()=>{
        const storedUser=localStorage.getItem("user");
        if (storedUser){
            setUser(JSON.parse(storedUser))
        }
    },[]);

    const handleLogout=()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate('/');
    };

    return(
        <div className={styles.header}>
            <h1 className={styles.heading}>Jobfinder</h1>
            <div className={styles.headerRight}>
                {user?(
                    <>
                    <span className={styles.username}>Hi,{user.name}</span>
                    <button className={styles.logout} onClick={handleLogout}>Logout</button>
                    </>
                ):(
                    <>
            <button className={styles.headerButton} onClick={handleLoginClick}>Login</button>
            <button className={styles.headerButton} onClick={handleRegisterClick}>Register</button>
            </>
                )}
            </div>
        </div>
    )
}

export default Header;