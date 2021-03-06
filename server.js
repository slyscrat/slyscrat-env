var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')
var port = 8080

 
//BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
//Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());    //persistent
 
 
//Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
 
//Models
var models = require("./app/models");
 
//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
require('./app/config/passport/passport.js')(passport, models.user);
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice!')
}).catch(function(err) {
    console.log(err, "Wrong!")
});
 
app.listen(port , function(err) {
    if (!err) console.log("Site is live");
    else console.log(err)
});