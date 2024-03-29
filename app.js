const express = require('express');

const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const passport = require('passport');
var session = require("express-session");

const authRoutes = require('./routes/auth');
const profileRoutes=require('./routes/profile');
const questionRoutes=require('./routes/questions');
const dev=require('./routes/dev');


const askquestionRoutes=require('./routes/askquestion');
const answerRoutes=require('./routes/answer');
const passportSetup = require('./config/passport_setup');
const cs = require('cookie-session')
const conn = require('./config/database');
const app = express();






// const {answer} = require('./routes/index');
 
const port = process.env.PORT||5000;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
// app.use(express.cookieParser());
app.use(fileUpload()); // configure fileupload
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// express session middleware setup
app.use(session({
    secret: 'W$q4=25*8%v-}UV',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 300000
        }
}));



// passport middleware setup ( it is mandatory to put it after session middleware setup)
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/questions',questionRoutes);
app.use('/askquestion',askquestionRoutes);
app.use('/answer',answerRoutes);
app.use('/dev',dev);



// app.use(function (req, res, next) {
//     if(req.session.user !== undefined){
//     res.locals.loggedIn = req.user;
//     console.log("res.logged "+res.locals.loggedIn);
//     } else{
//     res.locals.loggedIn = null;
//     }
//     next();
//     });

app.get('/', (req, res) => {


    
    // res.locals.user = req.user;
    res.render('index');
});


//middleware to make ‘user’ available to all templates





// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});