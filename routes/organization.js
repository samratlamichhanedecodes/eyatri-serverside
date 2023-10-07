const express = require('express');

const organizationControllerRoutes = require("../controllers/organization");

const router = express.Router();

router.post("/add-vehicle", organizationControllerRoutes.addVehicle);

router.delete("/remove-vehicle", organizationControllerRoutes.removeVehicle);

module.exports = router;