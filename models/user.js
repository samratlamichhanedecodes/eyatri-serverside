const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        // required: true,
        default: ''
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        default: ''
    },
    is_vehicle_owner: {
        type: Boolean,
        // required: true,
        default: false
    },
    otp: {
        type: String,
        default: '0000'
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
            default: [27.671378, 85.338855]
        }   
    },
    is_verified: {
        type: Boolean,
        // required: true,
        default: false
    }
});


module.exports = mongoose.model('User', userSchema);