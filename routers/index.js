const express = require('express');
const passport = require('passport');
const router = express.Router();

const homeController = require("../controllers/home_controller");
const chattingController = require("../controllers/chatting_controller");

router.get('/', homeController.home);
router.post('/send-message',passport.checkAuthenticated,chattingController.send_message);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));
router.use('/friends',require('./friends'));

module.exports = router;


