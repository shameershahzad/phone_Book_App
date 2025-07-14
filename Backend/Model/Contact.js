const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name:String,
    email:String,
    contact:String,
    address:String,
    userId: String   // ← to store the ID of the user who owns this contact
})

const ContactModel = mongoose.model("Contact",ContactSchema);
module.exports = ContactModel;