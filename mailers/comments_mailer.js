const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlTemplate = nodeMailer.renderTemplate({comment:comment},"/comments/new_comment.ejs");
    nodeMailer.transporter.sendMail({
        from:"project.work.codeial@gmail.com",
        to:comment.user.email,
        subject: "new comment published!",
        html: htmlTemplate
    },(err,info)=>{
        if(err){ console.log("error in sending mail" ,err);return; }

        console.log("message sent");
        return;
    });
}