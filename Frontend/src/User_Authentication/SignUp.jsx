import React from 'react'
import './SignUp.css'

import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios"


function SignUp() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate()


const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3000/SignUp",{name,email,city,password})
    .then(result => {
        console.log(result);
        setMessage("SignUp Successfully");
        navigate("/")
    })
    .catch(err => {
        console.log(err);
        setMessage("SignUp Failed!");
    })
}

  return (
    <>
        <form onSubmit={handleSubmit}>
      <div style={{height:"390px",width:"300px",border:"2px solid rgb(134, 130, 130)",marginLeft:"38%",
        marginTop:"100px",borderRadius:"10px",backgroundColor:"rgb(160, 191, 223)",color:"#5a5a5a"}}>
        <h1 style={{textAlign:"center"}}>SignUp Page</h1>
        <label style = {{marginLeft:"10px",color:"#5a5a5a"}}><b>Name:</b></label>
        <input type ="text" name ='name' placeholder = "Enter name" onChange={(e) => setName(e.target.value)}
         className='input-field' style = {{marginLeft:"30px",color:"#5a5a5a"}}/>
         <br />
         <br />
         <label style = {{marginLeft:"10px",color:"#5a5a5a"}}><b>Email:</b></label>
            <input type ="email" name ='email' placeholder = "Enter email " onChange={(e) => setEmail(e.target.value)}
         className='input-field' style = {{marginLeft:"30px"}}/>
         <br />
         <br />
         <label style = {{marginLeft:"10px",color:"#5a5a5a"}}><b>City:</b></label>
            <input type ="text" name ='city' placeholder = "Enter city " onChange={(e) => setCity(e.target.value)}
         className='input-field' style = {{marginLeft:"40px"}}/>
         <br />
         <br />
         <label style = {{marginLeft:"10px",color:"#5a5a5a"}}><b>Password:</b></label>
        <input type ="password" name ='password' placeholder = "Enter password" onChange={(e) => setPassword(e.target.value)}
         className='input-field' style = {{marginLeft:"5px"}}/>
         <br />
         <br />
         <button type='submit' className='btnSignUp'
          >SignUp</button>
         <br />
         <p style ={{marginLeft:"30px"}}>Already have an account? 
         <Link to = "/" style = {{color:"#0066cc",textDecoration:"none"}}>  Login</Link>
           </p>
      {message && <p style={{ color: "white", marginLeft: "110px" }}>{message}</p>}
         
      </div>
      </form>
    </>
  )
}

export default SignUp
