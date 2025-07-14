import React from 'react'
import "./AddContacts.css"
import { useState } from 'react'
import axios from 'axios';

function AddContacts() {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');
  const [address,setAddress] = useState('');
  const [message,setMessage] = useState('');
  const [error,setError] = useState('')

 const handleSubmit = (e) => {
e.preventDefault();

//  Validate phone number length
if (contact.length !== 11) {
  setError('Phone number must be exactly 11 digits');

  setTimeout(() => {
    setError('');
  }, 2000);

  return;
}

const token = localStorage.getItem("token");

if(!token){
    alert("Please login again.");
    return;
}
if (!name || !email || !address || !contact) {
  setError('All fields are required.');
  return;
}
// Proceed only if phone number is valid
axios.post("http://localhost:3000/addContact", { name, email, contact, address }, {
  headers: {
    Authorization: `Bearer ${token}`
     // saved on login
  }
  
})
  .then(res => {
    console.log(res);
    setMessage("Contact added successfully!");
    setName('');
    setEmail('');
    setContact('');
    setAddress('');
    setError('');

    setTimeout(() => {
      setMessage('');
    }, 3000);
  })
  .catch(err => {
    console.log(err);
    setMessage("Contact not added");

    setTimeout(() => {
      setMessage('');
    }, 3000);
  });

 }

 console.log("Token:", localStorage.getItem("token"));


const handleContact = (e) => {
  const value = e.target.value;

  if (/^\d*$/.test(value)) {
    setContact(value);

    
  }
};


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='divContacts'>
     <h1 style = {{textAlign:"center"}}>Add Contact</h1> 
    <label> Name:</label>
    <input className='input-field' style ={{marginLeft:"17px"}}
     type = "text" placeholder = "Enter  name..." value = {name} onChange={(e) => setName(e.target.value)} />
    <br />
    <br />
    <label>Email:</label>
    <input className='input-field' style ={{marginLeft:"17px"}}
     type = "email" placeholder = "Enter email..." value = {email} onChange={(e) => setEmail(e.target.value)} />
    <br />
    <br />

    <label>Ph. No:</label>
       <input className='input-field' style ={{marginLeft:"13px"}} maxLength="11"
     type = "tel" placeholder = "Enter phone no..." value = {contact} onChange={handleContact} />
    <br />
    <br />

    <label style = {{  display:" flex",flexDirection: "row",
  marginBottom: "10px"}}>Address:
  <textarea placeholder='Enter address...' onChange={(e) => setAddress(e.target.value)} value={address}
   style = {{marginLeft:"5px",height:"50px",outline:"none",border:"none",borderRadius:"5px",width:"200px",
   display:"block",marginBottom:"2px"}} />
  </label>
    <button className='saveBtn' type = "submit">Save</button>
    {error && <h3 style = {{marginLeft:"20px",color:"red"}}>{error}</h3>}
      {message && <h3 style = {{marginLeft:"40px"}}>{message}</h3>}
       
        </div>
      </form>
    </>
  )
}

export default AddContacts
