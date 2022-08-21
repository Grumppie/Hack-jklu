import React, { useState } from 'react'
import Button from '../../components/Button'
import background from '../../Assets/loginBackground.png'
import classes from './Register.module.css'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [skills, setSkills] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedOption, setSelectedOption] = useState("mentor");

    const skillOptions = ["React", "AI/ML", "Nodejs", "Django", "Express", "Flask"]
    const navigate = useNavigate()

    const addSkill = (index) => {
        setSkills([...new Set([...skills, skillOptions[index]])])
    }

    const removeSkill = (skill) => {
        setSkills(skills.filter((skl) => skl !== skill))
    }

    const RegisterUser = async () => {
        const user = selectedOption === "mentor" ? "mentor" : "mentee";
        const response = await fetch(`http://localhost:4000/auth/${user}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                skills
            }),
        })

        const data = await response.json()
        console.log(data)
        if (data.status === 'ok') {
            localStorage.setItem('email', email)
            localStorage.setItem('name', name)
            localStorage.setItem("user", `${selectedOption}`)
            navigate('/home')
        }
    }
    return (
        <div className={classes.loginMainDiv} style={{
            backgroundImage: `url(${background})`, height: "fitContent", backgroundRepeat: 'no-repeat', width: "100wh", backgroundSize: 'cover',
        }}  >
            {/* <h1 style={{ marginBottom: "2rem" }}>DevelUp</h1> */}
            <div className={classes.loginBox}>
                <h1 style={{ marginBottom: "2rem" }}>Register to DevelUp</h1>
                <h3 style={{ marginBottom: "2rem" }}>Choose an options</h3>
                <div style={{ marginBottom: "2rem" }} className={classes.selectoption}>
                    <div style={{ backgroundColor: `${selectedOption === "mentor" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentor")}><h1>Mentor</h1></div>
                    <div style={{ backgroundColor: `${selectedOption === "mentee" ? "#FFC23C" : "#A5C9CA"}` }} onClick={() => setSelectedOption("mentee")}><h1>Mentee</h1></div>
                </div>
                <form action="">
                    <input className="inputBox" type="text" id="name" name="name" placeholder='Name' onChange={(e) => setName(e.target.value)} value={name} />
                    <input className="inputBox" type="email" id="email" name="email" placeholder='Email Id' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input className="inputBox" type="password" id="password" name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <div className={classes.skills}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Choose Skills</h3>
                        <div className={classes.skillsDiv}>
                            {skillOptions.map((skill, index) => {
                                return <h3 className={classes.skill} key={index} onClick={() => addSkill(index)} style={{ textAlign: 'center', margin: '10px', marginBottom: '10px', display: 'inline' }}>{skill}</h3>
                            })}
                        </div>
                    </div>
                    <div className={classes.skills}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>Skills according to priority</h3>
                        <div className={classes.skillsDiv}>
                            {skills.map((skill, index) => {
                                return <div className={classes.skill} key={index} style={{ textAlign: 'center', margin: '10px', marginBottom: '10px', display: 'inline' }} onClick={() => removeSkill(skill)}><h3> x {skill}</h3></div>
                            })}
                        </div>
                    </div>
                </form>
                {
                    selectedOption === "mentor" ?
                        <div onClick={RegisterUser} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} ><Button name="Register as Mentor" ></Button></div> : <div onClick={RegisterUser} style={{ display: 'flex', justifyContent: 'center' }}><Button name="Register as Mentee" to="/"></Button></div>
                }
                <h3 style={{ marginTop: "2rem" }}>Already a member? <span onClick={() => navigate('/login')} style={{ color: "#FFC23C", cursor: "pointer" }}>LogIn</span></h3>
            </div >

        </div >
    )
}

// ()=>set(val)