const Organization = require('../models/organization');

const randomstring = require('randomstring');

const jwt = require("jsonwebtoken");
secretKey = 'MySecretOrg';

const {validationResult} = require('express-validator');

//Organization authentication

exports.login = async (req, res, next) => {
    const phone = req.body.phone;

    try{
        const existingOrg = await Organization.findOne({phone});

        if(!existingOrg){
            res.status(400).json({ message: "Organization is not registered please register your organization first"});

        }else{
            const newOTP = randomstring.generate({
                length: 4,
                charset: 'numeric'
            });
            existingOrg.otp = newOTP;
            await existingOrg.save();
            res.status(200).json({message: "OTP sent successfully", otp: existingOrg.otp});
        }

    }catch(error){
        console.error('Error:', error);
        next(error);

    }
}


exports.verifyOTP = async (req, res, next) => {
    const phone = req.body.phone;
    const otp = req.body.otp;

    const organization = await Organization.findOne({phone})
    try{
        if (organization.otp !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // OTP is valid, generate JWT token
        const payload = {
            orgId: organization._id, // Include any user-specific information you need
            phone: organization.phone,
            otp: organization.otp
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' }); // Token expires in 24 hour

        res.status(200).json({ message: 'OTP verified successfully', phone: organization.phone, token });
    }catch(error){
        console.error('Error:', error);
        next(error);
    }
}

exports.signup = async (req, res, next) => {
    const { org_name, phone } = req.body;

    try{
        const existingOrgByName = await Organization.findOne({ org_name });

        if(existingOrgByName){
            res.status(400).json({message: "Organization with this name already exists."});
        }

        const existingOrgByPhone = await Organization.findOne({ phone });

        if(existingOrgByPhone){
            res.status(400).json({message: "Phone number you entered is already registered"});
        }

        const newOrg = new Organization({phone, org_name});
        await newOrg.save();
        res.status(201).json({message: "Organization created successfully.", newOrg});
    }catch(error){
        console.error('Error:', error);
        next(error);
    }

}