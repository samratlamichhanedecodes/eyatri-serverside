const express = require('express');

const {body} = require('express-validator');

const isAuthUser = require('../middleware/is-auth');

const userControllerRoutes = require("../controllers/user");

const router = express.Router();

router.put('/update',[
    body('full_name').trim().isLength({min:3}).withMessage("Name too short"),
    body('email').trim().isEmail().withMessage("Please enter the valid email")
], userControllerRoutes.updateUser);


router.get("/search-vehicles", isAuthUser, userControllerRoutes.getVehicles);

module.exports = router;