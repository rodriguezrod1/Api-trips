const express = require("express")
const controller = require('../tripsController')

// controllers


const router = express.Router()

// Routes
router
    .get("/", controller.testing)
    .get("/trips", controller.get)
    .post("/trips", controller.store)


module.exports = router