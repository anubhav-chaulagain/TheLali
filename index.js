const express = require('express');
const path = require('path');
const database = require('./data/database')
const User = require('./models/User')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('landing');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/signup', (req, res)=> {
    const user = new User(req.body.username, req.body.contactNo, req.body.email, req.body.password, req.body.city);
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/changePassword', (req, res)=> {
    res.render('password');
})

app.get('/otp', (req, res)=> {
    res.render('otp');
})

app.get('/profile', (req, res)=> {
    res.render('profile');
})

app.get('/main', (req, res)=>{
    res.render('mainPage');
})

app.get('/emiCalculator', (req, res)=>{
    res.render('emiCalculator');
})

app.get('/postproperty', (req, res)=>{
    res.render('postproperty');
})

database.connectToDatabase().then(
    ()=>app.listen(3000)
).catch((e)=>console.log("hi: "+ e)
);
