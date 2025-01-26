const bcrypt = require('bcrypt');

const { initializeApp } = require('firebase/app');
// const { getAnalytics } = require("firebase/analytics");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { getDatabase, ref, set } = require("firebase/database");


const firebaseConfig = {
    apiKey: "AIzaSyClUIw9MuThkqyonfJlKXWghrsgb8iz7kY",
    authDomain: "thelali-5163a.firebaseapp.com",
    databaseURL: "https://thelali-5163a-default-rtdb.firebaseio.com",
    projectId: "thelali-5163a",
    storageBucket: "thelali-5163a.firebasestorage.app",
    messagingSenderId: "593215870274",
    appId: "1:593215870274:web:2e6864e3e6d6d4e5d8e4db",
    measurementId: "G-H7HH01TPE9"
  };

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
class User {
    constructor(name, contactno, email, password, city) {
        this.name = name;
        this.contactno = contactno;
        this.email = email;
        this.password = password;
        this.city = city;
    }

    async insertUser() {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 12);
    
            const auth = getAuth();
    
            // Create a new user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, this.email, hashedPassword);
            const user = userCredential.user; // Get the authenticated user's data
            const userId = user.uid; // Get the user's unique ID (uid)
    
            console.log("User signed up successfully:", userId);
    
            // Write additional user data to Firebase Realtime Database
            const db = getDatabase();
            await set(ref(db, `users/${userId}`), {
                contactno: this.contactno,
                email: this.email,
                city: this.city,
                createdAt: new Date().toISOString(), // Add a timestamp for tracking
            });
    
            console.log("User data saved in Realtime Database successfully!");
        } catch (error) {
            console.log("Error during user creation or saving data:", error.code, error.message);
        }
    }
    

    getLogin() {
        
    }

    updateUser() {

    }
}

module.exports = User;