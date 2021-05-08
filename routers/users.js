const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require("../controllers/users_controller");

router.get('/profile', passport.checkAuthenticated, userController.profile);
router.get('/sign-up', userController.sign_up);
router.get('/sign-in', userController.sign_in);
router.get('/sign-out', userController.sign_out);
router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' }
), userController.createSession)
module.exports = router;


