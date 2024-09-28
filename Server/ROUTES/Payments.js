// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature } = require("../CONTROLLER/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../MIDDLEWARES/auth")
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifySignature", verifySignature)

module.exports = router