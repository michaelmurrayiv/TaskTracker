const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;
const data = require('./dummy_data');

require('dotenv').config();

console.log(process.env.DB_PASSWORD);
// connect to database
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://michael-murray-iv:${process.env.DB_PASSWORD}@taskmanagercluster.3uryttn.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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


