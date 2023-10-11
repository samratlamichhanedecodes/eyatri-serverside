const mongoose = require('mongoose');
const randomstring = require('randomstring');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        // required: true,
        default: ''
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        // required: true,
        default: ''
    },
    is_vehicle: {
        type: Boolean,
        // required: true,
        default: false
    },
    otp: {
        type: String,
        default: function () {
            // Generate a random 4-digit OTP
            return randomstring.generate({
              length: 4,
              charset: 'numeric',
            });
        }
    },
    home: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
            default: [85.338855, 27.671378]
        }   
    },
    is_verified: {
        type: Boolean,
        // required: true,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema);