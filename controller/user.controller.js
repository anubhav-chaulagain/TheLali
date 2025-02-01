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

  res.redirect("/main");
}

module.exports = {createAccountWithEmailAndPassword:createAccountWithEmailAndPassword,
  loginWithEmailAndPassword:loginWithEmailAndPassword
}