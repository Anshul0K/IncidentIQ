const Incident = require("../models/Incident");


const createIncident = async (req, res) => {
  try {
    const { title, description, severity } = req.body;

    if (!title || !description || !severity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const incident = new Incident({
      title,
      description,
      severity,
      createdBy: req.user.id,
    });

    await incident.save();

    res.status(201).json({
      message: "Incident created",
      incident,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// const getIncidents = async (req, res) => {
//   try {
//     const { status, severity } = req.query;

//     const filter = {
//       createdBy: req.user.id,
//     };

//     if (status) filter.status = status;
//     if (severity) filter.severity = severity;

//     const incidents = await Incident.find(filter).sort({ createdAt: -1 });

//     res.json({ incidents });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
const getIncidents = async (req, res) => {
  try {
    const { status, severity, all } = req.query;

    const filter = {};

    // 🔐 If NOT requesting all, show only user's incidents
    if (all !== "true") {
      filter.createdBy = req.user.id;
    }

    if (status) filter.status = status;
    if (severity) filter.severity = severity;

    const incidents = await Incident.find(filter).sort({
      createdAt: -1,
    });

    res.json({ incidents });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};


const getIncidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const incident = await Incident.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.json({ incident });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["open", "resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // 🔐 ownership check
    if (incident.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    incident.status = status;
    await incident.save();

    res.json({
      message: "Incident status updated",
      incident,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateIncidentDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }

    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // 🔓 NO ownership check (any authenticated user allowed)
    incident.description = description;

    await incident.save();

    res.json({
      message: "Incident description updated",
      incident,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
  createIncident,
  getIncidents,
  getIncidentById,
  updateIncidentStatus,
  updateIncidentDescription,
};
