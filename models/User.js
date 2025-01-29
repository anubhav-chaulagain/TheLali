const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set } = require("firebase/database");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

// Initialize Firebase Admin SDK (for server-side operations)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com",
});

// Initialize Firebase Client SDK
const firebaseConfig = {
  apiKey: "AIzaSyClUIw9MuThkqyonfJlKXWghrsgb8iz7kY",
  authDomain: "thelali-5163a.firebaseapp.com",
  databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com",
  projectId: "thelali-5163a",
  storageBucket: "thelali-5163a.firebasestorage.app",
  messagingSenderId: "593215870274",
  appId: "1:593215870274:web:2e6864e3e6d6d4e5d8e4db",
  measurementId: "G-H7HH01TPE9",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase); // Initialize Auth once

class User {
  constructor(name, contactno, email, password, confirmPass, city) {
    this.name = name;
    this.contactno = contactno;
    this.email = email;
    this.password = password;
    this.city = city;
    this.confirmPass = confirmPass;
  }

  async insertUser() {
    const emptyFields = [];
    if (!this.name) emptyFields.push("name");
    if (!this.contactno) emptyFields.push("contactno");
    if (!this.email) emptyFields.push("email");
    if (!this.password) emptyFields.push("password");
    if (!this.confirmPass) emptyFields.push("confirmPassword");
    if (!this.city) emptyFields.push("city");

    if (emptyFields.length > 0) {
      return {
        success: false,
        message: "The following fields are empty:",
        errorFields: emptyFields,
      };
    }

    // Improved email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
        errorFields: ["email"],
      };
    }

    if (this.password.length < 8) {
      return {
        success: false,
        message: "Password should be at least 8 characters long",
        errorFields: ["password"],
      };
    }

    if (this.password !== this.confirmPass) {
      return {
        success: false,
        message: "Passwords do not match",
        errorFields: ["password", "confirmPassword"],
      };
    }

    try {
      // Use Firebase Admin SDK for user creation
      const userRecord = await admin.auth().createUser({
        email: this.email,
        password: this.password, // Firebase hashes it automatically
        phoneNumber: this.contactno ? `+977${this.contactno}` : undefined,
        displayName: this.name,
      });

      console.log("User created successfully:", userRecord.uid);

      // Write user data to Firebase Realtime Database
      await set(ref(database, `users/${userRecord.uid}`), {
        contactno: this.contactno,
        username: this.name,
        city: this.city,
        createdAt: new Date().toISOString(),
      });

      console.log("User data saved in Realtime Database successfully!");
      return { success: true, message: "User created successfully" };
    } catch (error) {
      console.log("Error during user creation:", error.code, error.message);
      return { success: false, message: "Error creating user", error: error };
    }
  }

  async getUsers() {
    try {
      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users.map((userRecord) => userRecord.toJSON());
      return { success: true, users: users };
    } catch (error) {
      console.log("Error fetching users:", error.code, error.message);
      return { success: false, message: "Error fetching users", error: error };
    }
  }
}

module.exports = User;
