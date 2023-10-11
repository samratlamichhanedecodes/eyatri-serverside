const express = require('express');
const {body} = require('express-validator');

const orgauthController = require("../controllers/orgauth");

const router = express.Router();

router.post('/signup', orgauthController.signup);

router.post('/login', [
    body('phone').trim().isLength(10).withMessage("Please enter a valid Phone number")
], orgauthController.login);

router.post('/verify-otp', orgauthController.verifyOTP);

module.exports = router;