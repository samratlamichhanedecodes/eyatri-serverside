const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    org_name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    
});

module.exports = mongoose.model('Vehicle', vehicleSchema);