const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const auth_credential = require('../credentials/nodemailer_credential');
let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: auth_credential.user,
        pass: auth_credential.password 
    },
  });

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){ console.log("Error in rendering template in nodemailer");return; }
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate: renderTemplate
}