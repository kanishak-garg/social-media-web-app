const express = require('express');

const router = express.Router();

const userController = require("../controllers/users_controller");

router.get('/profile', userController.profile);
router.get('/sign-up', userController.sign_up);
router.get('/sign-in', userController.sign_in);

router.post('/create', userController.create);
router.post('/create-session', userController.createSession)
module.exports = router;


