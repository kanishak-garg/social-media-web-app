const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const passportJWT = require('./config/passport-jwt-stratergy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { mongo } = require('mongoose');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const myMware = require('./config/middleware');

//setting up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server running on port 5000");

const path = require('path');

console.log(env.name);
console.log(path.join(__dirname,env.asset_path,'scss'));

if(env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.asset_path,'scss'),
        dest: path.join(__dirname,env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}


app.use(logger(env.morgan.mode,env.morgan.options));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.use(express.static('env.asset_path'));
// make upload path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment secret need to be proper key for now we put some random text
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 30)
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
app.use(flash());
app.use(myMware.setFlash);
app.use('/', require('./routers/index'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server ${err}`);
        return;
    }
    console.log(`server running on port: ${port}`);
});