const User = require("../models/user");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res, next) => {
    const {full_name, phone, is_owner} = req.body;
    const newUser = new User({
        full_name: full_name,
        phone: phone,
        is_owner: is_owner
    });

    await newUser.save();
};

exports.login = async (req, res, next) => {
    const phone = req.body.phone;
    
    try{
        const user = await User.findOne({phone: phone});

        if(!user){
            res.status(400).json('User not found!');
        }

        res.status(200).json({message: 'Login Successful', user: user});
    }catch(error){
        next(error);
    }
};