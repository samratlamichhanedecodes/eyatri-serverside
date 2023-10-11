const User = require("../models/user");
const Vehicle = require("../models/vehicle");

const randomstring = require('randomstring');

const jwt = require("jsonwebtoken");
secretKey = 'MySecretKey';

const {validationResult} = require('express-validator');

exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const {phone, is_vehicle} = req.body;
    
    if(!is_vehicle){
        //user must be a passenger if the user is not a vehicle
        try{
            const existingUser = await User.findOne({ phone });
    
            if(!existingUser){
                const newUser = new User({
                    phone: phone,
                });
    
                await newUser.save();
                res.status(201).json({message: "User created successfully", otp: newUser.otp});
            }else{
                const newOTP = randomstring.generate({
                    length: 4,
                    charset: 'numeric'
                });
                existingUser.otp = newOTP;
                await existingUser.save();
                res.status(200).json({message: "User already exists", otp: existingUser.otp});
            }
        }catch(error){
            console.error('Error:', error);
            next(error);
        };
    }else{
        //if the user is a vehicle searching for the vehicle in the database
        try{
            //new entry for the vehicle database
            const existingVehicle = await Vehicle.findOne({ phone });
            if(!existingVehicle){
               res.status(404).json({message: "Vehicle does not exit. Try again"});    
            }
            const newOTP = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            existingVehicle.otp = newOTP;
            await existingVehicle.save();
            res.status(200).json({message: "Vehicle exists", otp: existingVehicle.otp});
        }catch(error){
            console.error('Error:', error);
            next(error);
        };
    }
};

exports.verifyOTP = async (req, res, next) => {
    const phone = req.body.phone;
    const otp = req.body.otp;
    const is_vehicle = req.body.is_vehicle;

    try {
        let user;
        
        if (is_vehicle) {
            user = await Vehicle.findOne({ phone });
        } else {
            // Assuming you have a User model for passengers
            user = await User.findOne({ phone });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // OTP is valid, generate JWT token
        const payload = {
            userId: user._id, // Include any user-specific information you need
            phone: user.phone,
            is_vehicle: is_vehicle,
            otp: user.otp
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' }); // Token expires in 1 hour

        res.status(200).json({ message: 'OTP verified successfully', phone: user.phone, token });
    } catch (error) {
        console.error('Error:', error);
        next(error);
    };
};

