const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require("../controllers/users_controller");

router.get('/profile/:id', passport.checkAuthenticated, userController.profile);
router.post('/update/:id',passport.checkAuthenticated, userController.edit_profile); 
router.get('/sign-up', userController.sign_up);
router.get('/sign-in', userController.sign_in);
router.get('/sign-out', userController.sign_out);
router.post('/create', userController.create);
router.get('/forgot-password',userController.forgot_password);
router.post('/reset-password',userController.reset_password);
router.post('/update-password/:token',userController.update_password);
router.get('/reset-password/:token',userController.reset_page);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), userController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    { failureRedirect: '/users/sign-in' }
    ), userController.createSession);




module.exports = router;



