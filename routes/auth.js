const express = require('express');
const {body} = require('express-validator');

const authController = require("../controllers/auth");


const router = express.Router();


router.post('/login', [
    body('phone').trim().isLength(10).withMessage("Please enter a valid Phone number"),
    body('is_vehicle').isBoolean().withMessage("This must be a boolean value")
], authController.login);

router.post('/verify-otp', authController.verifyOTP);


module.exports = router;