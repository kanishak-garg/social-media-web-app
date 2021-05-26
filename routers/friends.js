const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friends_controller');

router.get('/add/:id',passport.checkAuthenticated,friendController.addFriend);
router.get('/remove/:id',passport.checkAuthenticated,friendController.removeFriend);


module.exports = router;