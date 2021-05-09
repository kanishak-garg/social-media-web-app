const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthenticated, postController.create);
router.post('/comment/', passport.checkAuthenticated, postController.addComment);
module.exports = router;