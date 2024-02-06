const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;
const data = require('./dummy_data');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/tasks", (req, res) => {
  res.json(data.Tasks);
});

app.get("/completed", (req, res) => {
  res.json(data.CompletedTasks);
});


