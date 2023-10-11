const express = require('express');

const organizationControllerRoutes = require("../controllers/organization");

const router = express.Router();

router.post("/add-vehicle", organizationControllerRoutes.addVehicle);

router.delete("/delete-vehicle", organizationControllerRoutes.removeVehicle);

router.post("/add-route", organizationControllerRoutes.addRoute);

router.delete("/delete-route", organizationControllerRoutes.removeRoute);

module.exports = router;