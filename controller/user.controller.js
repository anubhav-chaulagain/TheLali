const User = require("../models/User");
const { getDatabase } = require("firebase/database");

function createAccountWithEmailAndPassword(req, res) {
    const user = new User(req.body.username, req.body.contactNo, req.body.email, req.body.password, req.body.city);
    user.insertUser();
    
    res.redirect('/');
}

module.exports = {createAccountWithEmailAndPassword:createAccountWithEmailAndPassword}