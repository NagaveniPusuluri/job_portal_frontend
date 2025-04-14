import React, { useState } from "react";
import styles from './login.module.css';
import loginImg from '../assets/loginImg.png';
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_LOGIN_URL;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken");
        setError("");
        setResponse("");
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Login failed");
            }
            const data = await res.json();
            
            localStorage.setItem("authToken",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            setResponse(data.message);
            
        navigate("/main")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2>Already have an account?</h2>
                <p className={styles.subHeading}>Your personal job finder is here</p>
                <input className={styles.input} type="email" value={email} name="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.input} type="password" value={password} name="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Sign in</button>

                {error && <p className={styles.error}>{error}</p>}
                {response && <p className={styles.success}>{response}</p>}
                <p className={styles.subHeading}>Don’t have an account?<a href="/register">Sign Up</a>
                </p>
            </div>
            <div className={styles.right}>
                <img className={styles.img} src={loginImg} alt="login-img" />
                <h2 className={styles.imgHeading}>Your Personal Job Finder</h2>
            </div>
        </div>
    )

}

export default Login;