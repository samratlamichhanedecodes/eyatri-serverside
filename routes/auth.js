const express = require('express');
const {body} = require('express-validator');

const User = require('../models/user');

const authController = require("../controllers/auth");

const router = express.Router();


router.post('/login', [
    body('phone').trim().isLength(10).withMessage("Please enter a valid Phone number")
], authController.login);

module.exports = router;