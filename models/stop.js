const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stopSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

});

module.exports = mongoose.model('Stop', stopSchema);