
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set } = require("firebase/database");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");
const { signInWithEmailAndPassword } = require("firebase/auth");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com"
});

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

    if (!this.email.includes("@gmail.com")) {
      return {
        success: false,
        message: "Please enter a valid email address",
        errorFields: ["email"],
      };
    }

    if (this.password.length < 8) {
      return {
        success: false,
        message: "Password should be atleast 8 characters long",
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

      const auth = getAuth();

      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      const user = userCredential.user; // Get the authenticated user's data
      const userId = user.uid; // Get the user's unique ID (uid)

      console.log("User signed up successfully:", userId);

      // Write additional user data to Firebase Realtime Database
      const db = getDatabase();
      await set(ref(db, `users/${userId}`), {
        contactno: this.contactno,
        username: this.name,
        city: this.city,
        profileImg: "",
        createdAt: new Date().toISOString(), // Add a timestamp for tracking
      });

      console.log("User data saved in Realtime Database successfully!");
    } catch (error) {
      console.log(
        "Error during user creation or saving data:",
        error.code,
        error.message
      );
    }
    return { success: true, message: "", errorFields: [] };
  }

  async loginUser() {
    const emptyFields = [];
    if (!this.email) emptyFields.push("email");
    if (!this.password) emptyFields.push("password");

    if (emptyFields.length > 0) {
      return {
        success: false,
        message: "The following fields are empty:",
        errorFields: emptyFields,
      };
    }

    if (!this.email.includes("@gmail.com")) {
      return {
        success: false,
        message: "Please enter a valid email address",
        errorFields: ["email"],
      };
    }

    if (this.password.length < 8) {
      return {
        success: false,
        message: "Password should be atleast 8 characters long",
        errorFields: ["password"],
      };
    }

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;
      

      return { success: true, message:null, errorFields:[], userId:userId};
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, message: "Invalid Credentials!", errorFields:[]};
    }
  }


}

module.exports = User;
