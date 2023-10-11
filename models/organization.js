const mongoose = require("mongoose");

const randomstring = require('randomstring');

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    org_name: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    routes: [{
        type: Schema.Types.ObjectId,
        ref: 'Route'
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true,
        },
        coordinates: {
            type: [Number],
            // required: true
        }
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
    }
});

module.exports = mongoose.model('Organization', organizationSchema);