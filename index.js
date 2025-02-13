const express = require('express');
const path = require('path');
const database = require('./data/database')
const User = require('./models/User')
const userController = require('./controller/user.controller');
const propertyController = require('./controller/property.controller');
const admin = require('firebase-admin');
const multer = require('multer');
const storage = multer.memoryStorage();
const cloudinary = require('cloudinary').v2;
const upload = multer({ storage: storage });
const cookieParser = require('cookie-parser');

const authenticateToken = require('./middlewares/authenticateToken');
// 
const jwt = require("jsonwebtoken");
require("dotenv").config();
//

const app = express();
app.use(cookieParser());
app.use(express.json()); 

cloudinary.config({
    cloud_name: "dmyxuqajh",
    api_key: "781152936351827",
    api_secret: "n_Ahfsju5QPvigQ43FnTMIJzBQY",
  });


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/signup', (req, res) => {
    res.render('signup', {error: null, formData: {username: '', contactNo: '', email: '', password: '', city: '', confirmPassword: ''}, errorFields: []});
})

app.post('/signup', userController.createAccountWithEmailAndPassword);

app.get('/login', (req, res) => {
    res.render('login', {success: true, error: null, errorFields: []});
})

app.post('/login', userController.loginWithEmailAndPassword);

app.get('/changePassword', (req, res)=> {
    res.render('password');
})

app.get('/otp', (req, res)=> {
    res.render('otp');
})

app.get('/profile', (req, res)=> {
    res.render('profile');
})

app.use(authenticateToken);
app.get('/main', (req, res)=>{
    res.render('mainPage');
})

app.get('/emiCalculator', (req, res)=>{
    res.render('emiCalculator');
})  

app.get('/postproperty', (req, res)=>{
    res.render('postproperty');
})

app.post('/postproperty', upload.array("imagesUploader", 10), propertyController.insertPropertyDataToDatabase);

app.get('/card', (req, res)=>{
    res.render('card');
})

app.get('/photo', (req, res)=>{
    res.render('propertyPhoto');
})

app.post('/jwt', (req, res)=>{
    const userEmail = req.email;
    const userData = { email: userEmail };

    const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.json({accessToken: accessToken});
});

app.get('/details', (req, res)=>{
    res.render('propertyDetails');
})


database.connectToDatabase().then(
    ()=>app.listen(3000)
).catch((e)=>console.log("hi: "+ e)
);


