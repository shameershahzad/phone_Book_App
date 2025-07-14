import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./ViewContact.css"

function ViewContatcs() {
  
  const [allData,setallData] = useState([])
  const navigate = useNavigate()
  
useEffect(() => {
  const token = localStorage.getItem("token") 

  if (!token) {
    alert("Please login again.");
    navigate("/"); // redirect to login
    return;
  }

  axios.get("http://localhost:3000/viewContact", {
    headers: {
      Authorization: `Bearer ${token}` // send token in header
    }
  })
  .then(result => {
    if (result.data.length > 0) {
      console.log(result.data);
      setallData(result.data);
    } else {
      console.log("No contacts found");
    }
  })
  .catch(err => {
    console.log("Error loading contacts:", err);
    alert("Login expired. Please login again.");
    navigate("/");
  });
}, []);



const deleteData = (id) => {
  const token = localStorage.getItem("token");

  axios.delete(`http://localhost:3000/deleteContact/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  })
  .then(() => {
    console.log("Contact Deleted");
    setallData(prev => prev.filter(item => item._id !== id));
  })
  .catch(err => {
    console.log(err);
    alert("Session expired. Please login again.");
    navigate("/");
  });
};


const editData = (id) => {
  const foundID = allData.find(contact => contact._id === id)
  if(foundID){
    navigate(`/editContact/${id}`)
  }
  else{
    console.log("Contact id is not found")
  }
}

  return (
    <>
    <div className="view-contacts">
     <h1 style={{ textAlign: "center" }}>View Contacts</h1>

<div className="table-container">
  <table className="responsive-table" border={1}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th style={{width:"180px"}}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {allData.map((value, index) => (
        <tr key={index}>
          <td  data-label="Name">{value.name}</td>
          <td  data-label="Email">{value.email}</td>
          <td  data-label="Contact">{value.contact}</td>
          <td  data-label="Address">{value.address}</td>
      
          <td>
            <button className="btn btn-edit"onClick={() => editData(value._id)}>Edit</button>
            <button className="btn btn-delete" onClick={() => deleteData(value._id)}>Delete </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
    </>
  )
}

export default ViewContatcs
