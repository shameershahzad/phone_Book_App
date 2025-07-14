import React from 'react'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios"
import './Login.css'

function Login() {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  axios.post("http://localhost:3000/", { email, password })
    .then(result => {
      console.log(result.data); // Should log: { message: "Success", token: "..." }

      // Save the token
      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
      }

      // Check message
      if (result.data.message === "Success") {
        navigate("/home");
      } else {
        setMessage(result.data.message); // handle wrong password or user not found
      }
    })
    .catch(err => {
      console.log(err);
      setMessage("Login Failed!");
    });
};



  return (
    <>
          <form onSubmit={handleSubmit}>
      <div style={{height:"300px",width:"300px",border:"2px solid rgb(134, 130, 130) ",marginLeft:"36%",
        marginTop:"100px",borderRadius:"10px",backgroundColor:"rgb(160, 191, 223)", color:"#5a5a5a"
      }}>
        <h1 style={{textAlign:"center"}}>Login Page</h1>
        <label style ={{marginLeft:"20px",color:"#5a5a5a"}}><b>Email:</b></label>
        <input style = {{marginLeft:"15px"}} type ="email" name ="email" placeholder = "Enter name" onChange={(e) => setEmail(e.target.value)}
         className='input-field' autoComplete='off'/>
         <br />
         <br />
         <label style = {{marginLeft:"10px",color:"#5a5a5a"}}><b>Password:</b></label>
        <input type ="password" name = "password" placeholder = "Enter password" onChange={(e) => setPassword(e.target.value)}
         className='input-field' />
         <br />
         <br />
         <button type = "submit" className='btnLogin'
          >Login</button>
          <br />
          <p style={{marginLeft:"38px",color:"#5a5a5a"}}>Don't have an account?
                <Link to = "/SignUp" style = {{color:"#0d6efd",textDecoration:"none"}}>   SignUp</Link>
          </p>
      {message && <h3 style={{ color: "white", marginLeft: "110px" }}>{message}</h3>}
      </div>
      </form>
    </>
  )
}

export default Login
