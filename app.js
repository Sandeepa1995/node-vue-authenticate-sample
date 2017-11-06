const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mysql = require('mysql');
const sqlcon = require('./config/database');

const app=express();

const users = require('./routes/users');

// //Port Number
const  port=process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Body parser Middleware
app.use(bodyParser.json());

//Passpjort Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//User Routes
app.use("/users",users);

//Is database connected
sqlcon.connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + sqlcon.connection.threadId);
});

//Index Route
app.get('/',(req,res)=>{
    res.send("Invalid Endpoint");
});

//Start Server
app.listen(port,()=>{
    console.log("Server started on "+port);
})