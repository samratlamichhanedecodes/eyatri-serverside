const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    organization: {
        type: String,
        required: true
    },
    vehicle_num: {
        type: String,
        required: true
    },
    routes: [
        {
            name: String,
            type: {
                type: String,
                enum: ['LineString'],
                required: true
            },
            coordinates: {
                type: [[Number]],
                required: true
            }
        }],
    capacity: {
        type: Number,
        required: true
    },
    color_code: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
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
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);