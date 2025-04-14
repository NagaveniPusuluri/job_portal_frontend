import React, { useState } from 'react'
import styles from './register.module.css'
import loginImg from '../assets/loginImg.png'
const url=import.meta.env.VITE_REGISTER_URL;
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate=useNavigate();
    // const [mobile, setMobile] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState("");
    // const [error, setError]= useState('');
    const [formData, setFormData]=useState({
        name:'',
        email:'',
        mobile:'',
        password:'',
        terms:false
    })
    const [error, setError]=useState({
        mobile:'',
        email:''
    })
    const handleChange=(e)=>{
        const {name, value, type, checked}=e.target;
        setFormData({...formData,
        [name]:type==='checkbox'? checked:value
        })
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(url,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({name:formData.name, email:formData.email, mobile:formData.mobile, password:formData.password})
                })
                if(formData.name.trim().length===0 || formData.email.trim().length===0 || formData.mobile.trim().length===0 || formData.password.trim().length===0){
                   alert("Please fill all the details");
                   return
                }
                    const data= await res.json();
                    const status= res.status;

                    console.log(data,status);
                    
        navigate('/login');
                    return {data,status};
                   
                }
        catch(err){
            console.log(err);
            throw err;
        }
    }


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2>Create an account</h2>
                <p className={styles.subHeading}>Your personal job finder is here</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type="text"  name='name' placeholder="name" required onChange={handleChange} />
                <input className={styles.input} type="text" name='mobile' placeholder="mobile" required onChange={handleChange} />
                <input className={styles.input} type="email" name='email' placeholder="email" required onChange={handleChange} />
                <input className={styles.input} type="password" name='password' placeholder="password" required onChange={handleChange} />
                <label>
                <input type='checkbox' name='terms' onChange={handleChange} required /> 
                By creating an account, I agree to our terms of use and privacy policy
                </label>
                <button type='submit'>Create Account</button>
                </form>
                <p className={styles.subHeading}>Already have an account?<a href="/login">Sign In</a>
                </p>
            </div>
            <div className={styles.right}>
                <img className={styles.img} src={loginImg} alt="login-img" />
                <h2 className={styles.imgHeading}>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}

export default Register;