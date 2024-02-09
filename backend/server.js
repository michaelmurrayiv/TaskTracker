const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;

require('dotenv').config();    
app.use(cors());
app.use(express.json());

// connect to database
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    // get all uncompleted tasks
    app.get("/tasks/open", async (req, res) => {
      try {
        const tasks = await db
        .collection("tasks")
        .find({"completed": false})
        .toArray();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
      }
    });

    // get all completed tasks
    app.get("/tasks/closed", async (req, res) => {
      try {
        const tasks = await db
          .collection("tasks")
          .find({ completed: true })
          .toArray();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
      }
    });

    // mark task as completed/not completed
app.put("/tasks/:taskId/mark", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await db
      .collection("tasks")
      .findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return; 
    }

    const newStatus = !task.completed;

    const result = await db
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(taskId) },
        { $set: { completed: newStatus} }
      );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Task not found" });
    } else {
res
  .status(200)
  .json({
    message: "Task updated successfully",
    completed: newStatus,
  });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});


    // start backend
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


