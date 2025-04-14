import React, { useEffect, useState } from "react";
import styles from './search.module.css';
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_CREATE_JOB_URL;
import { useParams } from "react-router-dom";
const Search = () => {

    const [jobData, setJobData] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedOption, setSelectedOption] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const {id}=useParams();
    const [user,setUser]=useState(null);
    useEffect(() => {
        const fetchJobs = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                );
                const data = await response.json();
                const jobsArray = Array.isArray(data.jobs) ? data.jobs : Array.isArray(data) ? data : [];

                setJobData(jobsArray)
                setFilteredJobs(jobsArray);
            } catch (err) {
                console.log(err);
                setJobData([]);
                setFilteredJobs([]);
            }
        }
        const storedUser=localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
        fetchJobs();
    }, [])

    const handleApplyFilter = () => {
        const filtered = jobData.filter(job => {
            const matchesTitle = job.jobPosition.toLowerCase().includes(search.toLowerCase());
            const skillsArray = Array.isArray(job.skillsRequired)
                ? job.skillsRequired.map(s => s.toLowerCase())
                : (typeof job.skillsRequired === 'string'
                    ? job.skillsRequired.split(',').map(s => s.trim().toLowerCase())
                    : []);
            const matchesSkills = selectedOption.length === 0 ||
                selectedOption.every(skill =>
                    skillsArray.includes(skill.toLowerCase())
                );
            return matchesTitle && matchesSkills;
        });
        setFilteredJobs(filtered);
    };
    const handleClear = () => {
        setSearch("");
        setSelectedOption([]);
        setFilteredJobs(jobData);
    };
    const handleSelect = (e) => {
        const value = e.target.value;
        if (value !== "Skills" && !selectedOption.includes(value)) {
            setSelectedOption([...selectedOption, value]);
        }
    }
    const handleDetails = (id) => {
        console.log("Job ID to navigate:", id);
        navigate(`/job/${id}`);
    }

    const handleRemoveSkill = (skillToRemove) => {
        const updatedSkills = selectedOption.filter(skill => skill !== skillToRemove);
        setSelectedOption(updatedSkills);
    };
    const handleCreateJob=()=>{
        navigate('/create-job')
    }
    // const filteredJobs = jobData.filter(job => job.title.toLowerCase().includes(Search.toLowerCase()));
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input type="text"
                    className={styles.input}
                    value={search}
                    placeholder="Search by job title"
                    onChange={(e) => setSearch(e.target.value)} />
                <div className={styles.filterContainer}>
                    <div className={styles.skillSelect}>
                        <select className={styles.dropdown} onChange={handleSelect}>
                            <option value="Skills">Skills</option>
                            <option>Frontend</option>
                            <option>Backend</option>
                            <option>ReactJs</option>
                            <option>JavaScript</option>
                            <option>NodeJs</option>
                        </select>
                        {selectedOption.length > 0 ?
                            selectedOption.map((skill, index) => (
                                <div key={index} className={styles.skillName}>
                                    <div>
                                    {skill}
                                    </div>
                                    <button
                                        className={styles.removeSkillBtn}
                                        onClick={() => handleRemoveSkill(skill)}
                                    >
                                        ×
                                    </button>
                                </div>
                            )
                            ) : <div className={styles.noSkills}>Please select skills</div>
                        }
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.applyFilter} onClick={handleApplyFilter}>Apply Filter</button>
                        <button className={styles.clearButton} onClick={handleClear}>Clear</button>
                        {user && (
                            <button className={styles.createJob} onClick={handleCreateJob}>Add job</button>
                        )

                        }
                    </div>
                </div>
            </div>
            <div className={styles.listContainer}>
                {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? filteredJobs.map((job, id) => (
                    <div key={job.id} className={styles.job}>
                        <div className={styles.left}>
                            <div className={styles.imgContainer}>
                                <img src={job.addLogo} alt="logo" />
                            </div>
                            <div className={styles.jobDetails}>
                                <div>{job.jobPosition}</div>
                                <div className={styles.companyDetails}>
                                    <div> {job.size}</div>
                                    <div>{job.monthlySalary}</div>
                                </div>
                                <div className={styles.companyDetails}>
                                    <div>{job.jobType}</div>
                                    <div>{job.remoteOrOffice}</div>
                                </div>
                            </div>
                            <div>{job.location}</div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.skillContainer}>
                                {Array.isArray(job.skillsRequired)
                                    ? job.skillsRequired.map((skill, index) => (
                                        <div key={index} className={styles.skillsName}>{skill}</div>
                                    ))
                                    : typeof job.skillsRequired === "string"
                                        ? job.skillsRequired.split(",").map((skill, index) => (
                                            <div key={index} className={styles.skillsName}>{skill.trim()}</div>
                                        ))
                                        : <div className={styles.skillsName}>No skills listed</div>
                                }

                            </div>
                            <button onClick={() => handleDetails(job._id)}>View details</button>
                        </div>
                    </div>
                )) : (<p>No jobs found</p>)
                }
            </div>
        </div>
    )
}

export default Search;