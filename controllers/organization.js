exports.addVehicle = (req, res, next) => {
    res.json({ message: "Request executed successfully"});
};

exports.removeVehicle = (req, res, next) => {
    res.json({ message: "Request executed successfully"});
};

exports.addRoute = (req, res, next) => {
    req.json({ message: "Request for adding vehicles"});
};