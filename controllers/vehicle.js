const Vehicle = require("../models/vehicle");

exports.getVehicles = (req, res, next) => {
    const {from, to} = req.body;
    res.status(200).json({
        buses: [{message: "this is the array of buses" }]
    });
};
