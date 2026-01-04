require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");



const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors());
app.use(express.json());

// test routes
app.get("/", (req, res) => {
  res.send("IncidentIQ backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);


// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
