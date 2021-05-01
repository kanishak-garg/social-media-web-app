const express = require('express');

const router = express.Router();
const homeController = require("../controllers/home_controller");

router.use('/', homeController.home);



module.exports = router;
