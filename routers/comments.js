const express = require('express');
const passport = require('passport');
const router = express.Router();

const commmentController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthenticated, commmentController.create);
router.get('/delete/:id', passport.checkAuthenticated, commmentController.delete);

module.exports = router;