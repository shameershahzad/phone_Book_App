import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import './EditContact.css'

function EditContact() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [editContact, seteditContact] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

 //  Load contact details on mount
useEffect(() => {
  const token = localStorage.getItem("token");

  axios.get(`http://localhost:3000/editContact/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    seteditContact({
    name: res.data.name,
    email: res.data.email,
    contact: res.data.contact,
    address: res.data.address
  });
  })
  .catch(err => {
    console.log(err);
    alert("Failed to load contact. Please login again.");
    navigate("/");
  });
}, [id, navigate]);

//  Submit updated contact
const editData = () => {
  const token = localStorage.getItem("token");

  axios.put(`http://localhost:3000/updateContact/${id}`, {
    name,
    email,
    contact,
    address
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    alert("Contact updated");
    navigate("/viewContact");
  })
  .catch(err => {
    console.log(err);
    alert("Update failed. Please login again.");
  });
};

  return (
    <>
     <div style = {{   height: "350px",
    width:"400px",
    border:"2px solid #375577",
    borderRadius: "10px",
    marginLeft: "33%",
    marginTop: "150px",
    boxShadow:" 0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor:" #087bff79"}}>
        <h1 style={{textAlign:"center"}}>Edit Contact</h1> 
        <label style = {{marginLeft:"40px"}}>Name:</label>
     <input  type = "text" value ={editContact.name } style = {{marginLeft:"23px"}}
      /* "...editContact"  means it fills field previously only update those field which user want */
      onChange={(e) => seteditContact({...editContact,name:e.target.value})} />
     <br/>
     <br/>
        <label style = {{marginLeft:"40px"}}>Email:</label>

     <input type = "email" value ={editContact.email || ""} style = {{marginLeft:"23px"}}
     onChange={(e) => seteditContact({...editContact,email:e.target.value})} />
     <br/>
     <br/>
        <label style = {{marginLeft:"40px"}}>Contact:</label>

     <input type = "tel" value ={editContact.contact || ""} style = {{marginLeft:"10px",borderRadius:"5px"}}
      onChange={(e) => seteditContact({...editContact,contact:e.target.value})} />
     <br/>
     <br/>
        <label style = {{display:" flex",flexDirection: "row",
  marginBottom: "-19px"}}>Address:</label>
     <textarea value ={editContact.address || ""} 
        style = {{marginLeft:"112px",height:"50px",outline:"none",border:"none",borderRadius:"5px",width:"200px",
                    display:"block",marginBottom:"10px"}}
      onChange={(e) => seteditContact({...editContact,address:e.target.value})} />
     <br/>
     
     <button style = {{marginLeft:"185px",backgroundColor:"rgb(40, 150, 90)",color:"white",width:"60px"}}
     type="submit" onClick={editData} className='btnUpdate'>Update</button>
     </div>

        
    </>
  )
}

export default EditContact
