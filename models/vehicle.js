const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    org_name: {
        type: Schema.Types.ObjectId,
        ref: 'Organization'
        // required: true
    },
    vehicle_num: {
        type: String,
        // required: true
    },
    route: {
        type: Schema.Types.ObjectId,
        ref: 'Route'
    },
    capacity: {
        type: Number,
        // required: true
    },
    color_code: {
        type: String,
        // required: true
    },
    driver: {
        type: String,
        // required: true
    },
    imgUrl: {
        type: String,
    },
    vacant: {
        type: Number
    },
    last_location: {
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
    is_owner: {
        type: Boolean,
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
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);