const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("IncidentIQ backend is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
