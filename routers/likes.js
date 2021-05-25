const express = require('express');
const passport = require('passport');
const router = express.Router();

const likesController = require('../controllers/likes_controller');

router.get('/toggle/',passport.checkAuthenticated,likesController.toggleLike);


module.exports = router;