const express = require("express");
const app = express();
const PORT = process.env.PORT || 9999;
const tasks = require('./dummy_data');

app.use(express.json());

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
