const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friends_controller');

router.get('/add/:id',passport.checkAuthenticated,friendController.addFriend);

module.exports = router;