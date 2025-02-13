const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;
const admin = require("firebase-admin");
const { getDatabase, ref, update } = require("firebase/database");

async function createAccountWithEmailAndPassword(req, res) {
  const user = new User(
    req.body.username,
    req.body.contactNo,
    req.body.email,
    req.body.password,
    req.body.confirmPassword,
    req.body.city
  );

  const outcome = await user.insertUser();
  if (!outcome.success) {
    return res.render("signup", {
      error: outcome.message,
      formData: req.body,
      errorFields: outcome.errorFields,
    });
  }
  res.redirect("/");
}

async function loginWithEmailAndPassword(req, res) {
  const { email, password } = req.body;

  const user = new User(null, null, email, password, null, null);
  const outcome = await user.loginUser();

  if (!outcome.success) {
    return res.render("login", {
      formData: req.body,
      error: outcome.message,
      errorFields: outcome.errorFields,
    });
  }

  const userEmail = email;
  const userId = outcome.userId;
  const userData = { email: userEmail, userId: userId };

  const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  console.log("Access Token: ", accessToken);

  res.cookie("token", accessToken, {
    httpOnly: true, // Prevents JavaScript access (secure against XSS attacks)
    secure: true, // Send only over HTTPS (disable this in localhost)
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 3600000, // Cookie expires in 1 hour
  });

  res.redirect("/main");
}

async function getUserById(req, res) {
  try {
    const db = admin.database();
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    const userRef = db.ref(`users/${userId}`); // Reference to the user's data
    const snapshot = await userRef.once("value");

    const userData = snapshot.val();
    res.render("profile", { user: userData });
  } catch (error) {
    console.error("Error fetching user:", error.message);
  }
}

async function updateUserData(req, res) {
  try {
    let imageUrl; // Declare the variable outside the if-block

    if (req.file) {
      // Upload single image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "profile_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      imageUrl = result.secure_url; // Store the new image URL
    }

    const db = getDatabase();
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.userId;

    // Prepare the update object dynamically
    const updatedData = {
      contactno: req.body.phone,
      username: req.body.username,
      city: req.body.city,
      updatedAt: new Date().toISOString(), // Track the update time
    };

    // Only add profileImg if a new image was uploaded
    if (imageUrl) {
      updatedData.profileImg = imageUrl;
    }

    await update(ref(db, `users/${userId}`), updatedData);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
}


module.exports = {
  createAccountWithEmailAndPassword: createAccountWithEmailAndPassword,
  loginWithEmailAndPassword: loginWithEmailAndPassword,
  getUserById: getUserById,
  updateUserData: updateUserData,
};
