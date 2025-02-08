const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

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
  const { email, password } = req.body;

  const user = new User(null, null, email, password, null, null);
  const outcome = await user.loginUser();

  if (!outcome.success) {
    return res.render("login", {formData:req.body, error: outcome.message, errorFields: outcome.errorFields });
  }

  const userEmail = email;
  const userData = { email: userEmail };

  const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  console.log("Access Token: ", accessToken);

  res.cookie("token", accessToken, {
    httpOnly: true, // Prevents JavaScript access (secure against XSS attacks)
    secure: true, // Send only over HTTPS (disable this in localhost)
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 3600000 // Cookie expires in 1 hour
});

  res.redirect("/main");
}

module.exports = {createAccountWithEmailAndPassword:createAccountWithEmailAndPassword,
  loginWithEmailAndPassword:loginWithEmailAndPassword
}