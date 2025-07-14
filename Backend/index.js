  const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./Model/User")
const app = express()
const ContactModel = require('./Model/Contact')
const verifyToken = require("./Middleware/verifyToken")
// JWT contain three parts header,userId,signature and we verify with '.'
const jwt = require("jsonwebtoken");


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/User")
.then(() => {
    console.log("DB Connected!");
})
.catch(() => {
    console.log("DB not connected");
})


app.post("/SignUp",(req,res) => {
   UserModel.create(req.body)
   .then(result => res.json(result))
   .catch(err => res.json(err))
})



app.post("/", (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email })
    .then(user => {
      if (!user) {
        return res.json({ message: "No user found" }); 
      }

      if (user.password !== password) {
        return res.json({ message: "Password is incorrect" }); 
      }

      //  Create token and return
      const token = jwt.sign({ id: user._id }, "Your Secret Key", { expiresIn: "1h" }); //.sign() generate token

      return res.json({ message: "Success", token }); 
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ message: "Server error" }); 
    });
});

// CREATE Contact (with user ID from JWT)
app.post("/addContact", verifyToken, (req, res) => {
  const { name, email, contact, address } = req.body;

  ContactModel.create({
    name,
    email,
    contact,
    address,
    userId: req.userId  // This is the ID of the logged-in user
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
}); 


app.get("/viewContact", verifyToken, (req, res) => {
  ContactModel.find({ userId: req.userId })
    .then(contacts => res.json(contacts))
    .catch(err => res.status(500).json(err));
});

// req.params is always an object, so you must extract 'id' before using it

 // We pass the ID string directly because findByIdAndDelete expects a string, not an object.
// If we pass { id }, it won't work because that's an object, not the actual _id value.

app.delete("/deleteContact/:id", verifyToken, (req, res) => {
  ContactModel.findOneAndDelete({ _id: req.params.id, userId: req.userId })
    .then(deleted => res.json({ message: "Deleted successfully", deleted }))
    .catch(err => res.status(500).json(err));
});

app.get("/editContact/:id", (req, res) => {
  const { id } = req.params;

  ContactModel.findById(id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(result);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// UPDATE Contact
app.put("/updateContact/:id", verifyToken, (req, res) => {
  ContactModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body // update data you send from frontend
  )
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json(err));
});

const port = 3000;

app.listen(port,() => {
   console.log("Server is running");
} )