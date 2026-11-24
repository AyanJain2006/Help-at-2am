
const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests,
  updateRequest,
} = require("../controllers/requestController");

// Create emergency request
router.post("/", createRequest);

// Get all emergency requests
router.get("/", getRequests);

// Update emergency request
router.patch("/:id", updateRequest);

module.exports = router;
