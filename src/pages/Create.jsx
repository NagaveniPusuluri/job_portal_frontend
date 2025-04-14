import React, { useEffect, useState } from 'react';
import styles from '../pages/create.module.css'
import img from '../assets/jobCreate.png'
const url = import.meta.env.VITE_CREATE_JOB_URL;
import { useLocation, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
const Create = () => {
    //  const {id}=useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const editJob = location.state?.jobData;

    const [formData, setFormdata] = useState({
        companyName: '',
        addLogo: '',
        jobPosition: '',
        size: '',
        monthlySalary: '',
        jobType: '',
        remoteOrOffice: '',
        location: '',
        description: '',
        aboutCompany: '',
        skillsRequired: '',
        information: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("authToken")
        console.log(token);
        if(!token){
            alert("No token found.Please login");
            navigate('/login');
            return;
        }
        if (editJob && !editJob._id){
            alert("Invalid job data, can't update");
            return;
        }
        const payload = {
            ...formData,
            skillsRequired: typeof formData.skillsRequired==="string"
            ? formData.skillsRequired.split(',').map(skill => skill.trim())
            : formData.skillsRequired
        }
        const method = editJob ? 'PUT' : 'POST';
        const endPoint = editJob ? `${url}/${editJob._id}` : url;
        const redirect= editJob ?  `/job/${editJob._id}` : '/'
        try {
            const response = await fetch(endPoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            // const result=await response.json();
            if (response.ok) {
                const result = await response.json();
                console.log(editJob ? "Job updated successfuly" : "Job posted successfully", result);
                console.log("Token:", token);
                console.log("Method:", method);
                console.log("Endpoint:", endPoint);
                navigate(redirect)
            } else {
                console.log("Failed to post job")
            }
        } catch (err) {
            console.error(err)
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
      if(editJob){
        navigate(`/job/${id}`);
      }else{
          setFormdata({
            companyName: '',
            addLogo: '',
            jobPosition: '',
            monthlySalary: '',
            jobType: '',
            remoteOrOffice: '',
            size: '',
            location: '',
            description: '',
            aboutCompany: '',
            skillsRequired: '',
            information: ''
          })
    }}
    useEffect(() => {
        if (editJob) {
            setFormdata({
                ...editJob,
                skillsRequired: Array.isArray(editJob.skillsRequired)
                    ? editJob.skillsRequired.join(',')
                    : editJob.skillsRequired
            })
        }

    }, [editJob])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}>

                    <h1 className={styles.heading}>{editJob ? "Edit Job" : "Add job description"}</h1>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.group}>
                            <label className={styles.label}>Company Name</label>
                            <input className={styles.input} type='text' name='companyName'
                                value={formData.companyName}
                                onChange={handleChange}
                                placeholder='enter your company name here'
                                required />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Add logo URL </label>
                            <input type='text'
                                className={styles.input}
                                name='addLogo'
                                value={formData.addLogo}
                                onChange={handleChange}
                                placeholder='Enter the link'
                                alt='company-logo' />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}> Job position </label>
                            <input type='text'
                                className={styles.input}
                                name='jobPosition'
                                value={formData.jobPosition}
                                onChange={handleChange}
                                placeholder='Enter job position'
                                required />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Monthly salary   </label>
                            <input type='number'
                                className={styles.input}
                                name='monthlySalary'
                                value={formData.monthlySalary}
                                onChange={handleChange}
                                placeholder='Enter Amount in rupees'
                                required />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Job Type  </label>
                            <select className={styles.select} name="jobType" value={formData.jobType} onChange={handleChange} required>
                                <option value="">--Select--</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Internship">Internship</option>
                                <option value="Contract">Contract</option>
                                <option value="Part Time">Part Time</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Remote/office </label>
                            <select className={styles.select} name="remoteOrOffice" value={formData.remoteOrOffice} onChange={handleChange} required>
                                <option value="">--Select--</option>
                                <option value="wfo">Work from office</option>
                                <option value="wfh">Work from home</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Size </label>
                            <select className={styles.select} name="size" value={formData.size} onChange={handleChange} required>
                                <option value="">--Size--</option>
                                <option value="11-50">11-50</option>
                                <option value="51-100">51-100</option>
                                <option value="101-500">101-500</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Location </label>
                            <input type='text' className={styles.input}
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Enter Location'
                                required />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Description </label>
                            <textarea className={styles.textarea}
                                rows='4'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='Type the job description'
                                required></textarea>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}> About Company </label>
                            <textarea className={styles.textarea}
                                rows='4'
                                name='aboutCompany' value={formData.aboutCompany}
                                onChange={handleChange}
                                placeholder='Type about your company' required></textarea>
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}>Skills Required </label>
                            <input type='text'
                                className={styles.input} name='skillsRequired'
                                value={formData.skillsRequired}
                                onChange={handleChange}
                                placeholder='Enter the must have skills'
                                required />
                        </div>
                        <div className={styles.group}>
                            <label className={styles.label}> Information </label>
                            <input type='text'
                                className={styles.input}
                                name='information'
                                value={formData.information}
                                onChange={handleChange}
                                placeholder='Enter the additional information'
                                required />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button className={styles.cancelButton} type='button' onClick={handleCancel}>Cancel</button>
                            <button className={styles.addButton} type='submit'>  {editJob ? "Update Job" : "+ Add Job"}</button>
                        </div>
                    </form>

                </div>
                <div className={styles.right}>
                    <img className={styles.img} src={img} alt="create-img" />
                    <h2 className={styles.imgHeading}>Recruiter add job details here</h2>
                </div>

            </div>
        </>
    )
}
export default Create;