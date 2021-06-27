const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function (req, res) {
    
    try{
        let user =await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"invalid username or password"
            });
        }
        return res.status(200).json({
            message:"sign in successfull, token generated",
            data:{
                token : jwt.sign(user.toJSON(), env.jwt_secret,{ expiresIn: 1000000 })
            }
        });

    }catch(err){
        console.log("*********",err);
        return res.status(200).json({
            message:"internal server error"
        });
    }

}
