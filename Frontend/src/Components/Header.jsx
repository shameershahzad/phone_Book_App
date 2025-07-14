import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "./Header.css"

function Header() {
    const navigate = useNavigate();

  return (
    <>
      <div className='navDiv'>
          <Link to = "/home" style = {{textDecoration:"none",color:"black"}}>Home</Link>
          <Link to = "/addContact" style = {{textDecoration:"none",color:"black"}}>Add Contact</Link>
          <Link to = "/viewContact" style = {{textDecoration:"none",color:"black"}}>View Contact</Link>
          <button onClick = {() => navigate("/")}
            className='btnLogout'
            >Logout</button>
      </div>
    </>
  )
}

export default Header
