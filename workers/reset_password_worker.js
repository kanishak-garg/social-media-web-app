const Token = require('../models/user_token');
const queue = require('../config/kue');
const crypto = require('crypto');
const resetPassMailer = require('../mailers/reset_password_mailer');

queue.process('resets',async function(job,done){
    console.log("reset worker is processing the job",job.data);
    let token = await Token.create({
        user:job.data._id,
        accessToken:crypto.randomBytes(10).toString('hex'),
        valid:true
    });

    resetPassMailer.reset_pass(job.data,token);
    done();
});