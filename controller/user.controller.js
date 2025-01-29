const User = require("../models/User");
const { getDatabase } = require("firebase/database");

async function createAccountWithEmailAndPassword(req, res) {
    const user = new User(req.body.username, req.body.contactNo, req.body.email, req.body.password, req.body.confirmPassword, req.body.city);
    user.getUsers();
    const outcome = await user.insertUser();
    if(!outcome.success) {
        return res.render('signup', {error: outcome.message, formData: req.body, errorFields: outcome.errorFields});
    }
    res.redirect('/');
}

async function loginWithEmailAndPassword(req, res) {
    res.send('hi');
}

module.exports = {createAccountWithEmailAndPassword:createAccountWithEmailAndPassword,
    loginWithEmailAndPassword:loginWithEmailAndPassword
}