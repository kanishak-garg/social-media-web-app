const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const { mongo } = require('mongoose');
const mongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.use(express.static('./assets'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment secret need to be proper key for now we put some random text
    secret: "randomkey",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    },
    //mongostore is used to store session keys in the database to prevent logging out on server restart
    store: new mongoStore({
        mongoUrl: 'mongodb://localhost:27017/codial_development',
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// set up of router  can use ./router also because by default its /index
app.use('/', require('./routers/index'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`server running on port: ${port}`);
});