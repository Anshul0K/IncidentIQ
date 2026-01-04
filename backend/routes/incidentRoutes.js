const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  createIncident,
  getIncidents,
  updateIncidentStatus,
  getIncidentById,
  updateIncidentDescription,
} = require("../controllers/incidentController");

// create new incident
router.post("/", protect, createIncident);

// get all incidents
router.get("/", protect, getIncidents);

// update status (specific)
router.put("/:id/status", protect, updateIncidentStatus);

// update description (specific)
router.put("/:id/description", protect, updateIncidentDescription);

// view single incident (generic — MUST BE LAST)
router.get("/:id", protect, getIncidentById);


module.exports = router;
