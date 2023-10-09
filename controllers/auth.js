const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {validationResult} = require('express-validator');

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const phone = req.body.phone;
    
    try{
        const existingUser = await User.findOne({ phone });

        if(!existingUser){
            const newUser = new User({
                phone: phone,
            });

            await newUser.save();
            res.status(201).json({message: "User created successfully", otp: newUser.otp});
        }else{
            res.status(200).json({message: "User already exists", otp: existingUser.otp});
        }
    }catch(error){
        console.error('Error:', error);
        next(error);
    };
};