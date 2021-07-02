
const auth_credential = require('../credentials/nodemailer_credential');
const credentials = require('../credentials/google_credential');

const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("file.log", {
    interval: "1d", // rotate daily
    path: logDirectory
  });

const development = {
    name: 'development',
    asset_path:'./assets',
    session_cookie_key:'randomkey',
    db:'codial_development',
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: auth_credential.user,
            pass: auth_credential.password 
        },
      },
    google_client_id: credentials.clientID,
    google_client_secret: credentials.clientSecret,
    google_call_back_URL: credentials.callbackURL,
    jwt_secret: 'secret',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
}

const production = {
    name: 'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_USERNAME 
        },
      },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);