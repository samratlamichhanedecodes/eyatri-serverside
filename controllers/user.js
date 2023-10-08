const Passenger = require("../models/user");

exports.getVehicles = (req, res, next) => {
    const {from, to} = req.body;
    res.status(200).json({
        buses: [{message: "this is the array of buses" }]
    });
};