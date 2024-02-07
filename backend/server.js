const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;
const data = require('./dummy_data');

require('dotenv').config();

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
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    db = client.db("TaskTrackerDB");

    // set up endpoints
    app.get("/tasks", async (req, res) => {
      try {
        const tasks = await db.collection("tasks").find().toArray();
        console.log(tasks);
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
      }
    });

    
    // start backend
    app.use(cors());
    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
 
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
run().catch(console.dir);



// endpoint configurations


app.get("/completed", (req, res) => {
  res.json(data.CompletedTasks);
});


