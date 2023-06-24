const express = require("express")
const tripsController = require('../controllers/tripsController')

const router = express.Router()

// Routes
router
    .get("/", tripsController.testing)
    .get("/trips", tripsController.get)
    .post("/trips", tripsController.store)


module.exports = router