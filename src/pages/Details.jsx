import React, { useState, useEffect } from 'react'
import styles from './details.module.css'
import { useParams } from 'react-router-dom';
const url = import.meta.env.VITE_CREATE_JOB_URL;
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [user,setUser]=useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    if (!id) return
    const fetchJobs = async () => {
      const token = localStorage.getItem("authToken");
      console.log(token);
      console.log("Fetching:", `${url}/${id}`);
      try {
        const response = await fetch(`${url}/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        );
        const data = await response.json();
        console.log(data);
        // const jobsArray = Array.isArray(data.jobs) ? data.jobs : Array.isArray(data) ? data : [];
        // const selectedJob = jobsArray.find(job => job.id === id);
        setFilteredJobs([data.jobs]);
        // console.log(data)
        // console.log([data])
      } catch (err) {
        console.log(err);
        setFilteredJobs([]);
      }
    }
    const storedUser=localStorage.getItem("user");
    if(storedUser){
        setUser(JSON.parse(storedUser));
    }
    fetchJobs();
  }, [id])
  const handleEditJob=(jobData)=>{
    const cleanJobData = {
      _id: jobData._id,
      companyName: jobData.companyName,
      addLogo: jobData.addLogo,
      jobPosition: jobData.jobPosition,
      monthlySalary: jobData.monthlySalary,
      jobType: jobData.jobType,
      remoteOrOffice: jobData.remoteOrOffice,
      size: jobData.size,
      location: jobData.location,
      description: jobData.description,
      aboutCompany: jobData.aboutCompany,
      skillsRequired: jobData.skillsRequired,
      information: jobData.information,
    };
  
    navigate('/create-job/',{state:{jobData:cleanJobData}});
  }

  return (
    <div className={styles.detailsContainer}>
      {filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
        <div key={job._id || index} className={styles.details}>
          <div className={styles.titleHeader} >
            <h2>{job.jobPosition} {job.jobType} {job.companyName}</h2>
          </div>
          <div className={styles.detailsBody}>
            <h5>{job.jobType}</h5>
            <h1>{job.jobPosition}</h1>
            {user && (
                <button className={styles.createJob} onClick={()=>handleEditJob(job)}>Edit job</button>
            ) }
            <div>
              <div>Size: {job.size}</div>
              <div> {job.location}</div>
            </div>
            <div>
              <div>{job.monthlySalary} per month</div>
              <div>{job.companyName}</div>
            </div>
            <h3>About company</h3>
            <p>{job.aboutCompany}</p>
            <h3>About the  job/internship</h3>
            <p>{job.aboutCompany}</p>
            <h3>Skill(s) required</h3>
            <div>
              {Array.isArray(job.skillsRequired) ? job.skillsRequired.map((skill, index) => (
                <div key={index} className={styles.skill}>{skill}</div>
              )) : (
                <div>No skills listed</div>
              )}
            </div>
            <h3>Additional Information</h3>
            <p>{job.information}</p>
          </div>
        </div>
      )) : (<div className={styles.noDetails}>No Details</div>)}
    </div>
  )
}

export default Details
