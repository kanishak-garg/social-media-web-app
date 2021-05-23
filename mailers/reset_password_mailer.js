const nodeMailer = require('../config/nodemailer');

exports.reset_pass = (user,token) => {
    let htmlTemplate = nodeMailer.renderTemplate({
        user:user,
        token:token
    },"/reset_pass.ejs");
    nodeMailer.transporter.sendMail({
        from:"project.work.codeial@gmail.com",
        to:user.email,
        subject: "reset password",
        html: htmlTemplate
    },(err,info)=>{
        if(err){ console.log("error in sending mail" ,err);return; }

        console.log("message sent");
        return;
    });
}