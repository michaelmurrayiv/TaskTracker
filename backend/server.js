const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 9999;
const bcrypt = require("bcrypt");
const authenticateToken = require('./auth');
const mongoose = require("mongoose");
const User = require("./user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(cors());
app.use(express.json());

// connect to database
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://michael-murray-iv:${process.env.DB_PASSWORD}@taskmanagercluster.3uryttn.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
//connect to db using mongoose
const uri2 = `mongodb+srv://michael-murray-iv:${process.env.DB_PASSWORD}@taskmanagercluster.3uryttn.mongodb.net/TaskTrackerDB?retryWrites=true&w=majority`;

mongoose
	.connect(uri2, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

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
		app.get("/tasks/open", authenticateToken, async (req, res) => {
			try {
				const tasks = await db
					.collection("tasks")
					.find({ completed: false, userId: req.user.userId })
					.toArray();
				res.status(200).json(tasks);
			} catch (error) {
				res.status(500).json({ message: "Error fetching tasks", error });
			}
		});

		// get all completed tasks
		app.get("/tasks/closed", authenticateToken, async (req, res) => {
			try {
				const tasks = await db
					.collection("tasks")
					.find({ completed: true, userId: req.user.userId })
					.toArray();
				res.status(200).json(tasks);
			} catch (error) {
				res.status(500).json({ message: "Error fetching tasks", error });
			}
		});

		// mark task as completed/not completed
		app.put("/tasks/:taskId/mark", authenticateToken, async (req, res) => {
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
						{ $set: { completed: newStatus } }
					);

				if (result.modifiedCount === 0) {
					res.status(404).json({ message: "Task not found" });
				} else {
					res.status(200).json({
						message: "Task updated successfully",
						completed: newStatus,
					});
				}
			} catch (error) {
				res.status(500).json({ message: "Error updating task", error });
			}
		});

		// change date of task
		app.put("/tasks/:taskId/date", authenticateToken, async (req, res) => {
			try {
				const taskId = req.params.taskId;
				const task = await db
					.collection("tasks")
					.findOne({ _id: new ObjectId(taskId) });

				if (!task) {
					res.status(404).json({ message: "Task not found" });
					return;
				}

				const newDueDate = req.body.newDueDate;
				console.log(newDueDate);

				const result = await db
					.collection("tasks")
					.updateOne(
						{ _id: new ObjectId(taskId) },
						{ $set: { dueDate: newDueDate } }
					);

				if (result.modifiedCount === 0) {
					res.status(404).json({ message: "Task not found" });
				} else {
					res.status(200).json({
						message: "Task updated successfully",
						completed: newDueDate,
					});
				}
			} catch (error) {
				console.log(error);
				res.status(500).json({ message: "Error updating task", error });
			}
		});

		app.post("/tasks", authenticateToken, async (req, res) => {
			try {
				const { description, dueDate } = req.body;
				const userId = req.user.userId;

				let newTask = {
					description,
					completed: false,
					userId: userId,
				};

				if (dueDate) {
					newTask.dueDate = dueDate;
				}

				const result = await db.collection("tasks").insertOne(newTask);

				if (result.acknowledged) {
					res.status(201).json({
						message: "Task created successfully",
						task: {
							_id: result.insertedId,
							...newTask,
						},
					});
				} else {
					res.status(400).json({ message: "Task creation failed" });
				}
			} catch (error) {
				console.error("Error creating task:", error);
				res.status(500).json({ message: "Error creating task", error });
			}
		});


    // register with a new username and password
		app.post("/register", async (req, res) => {
			try {
				// Validation logic here (as needed)
				const { username, password } = req.body;
				if (!username || !password) {
					return res
						.status(400)
						.json({ message: "Username and password are required" });
				}
				const hashedPassword = await bcrypt.hash(password, 10);
				const count = await User.countDocuments();
				const newUser = await User.create({
					username,
					password: hashedPassword,
					userId: count,
				});
				console.log
				res.status(201).json(
					{ userId: newUser.userId, username: newUser.username });
			} catch (error) {
				if (error.code === 11000) {
					return res.status(409).json({ message: "Username already exists" });
				}
				console.error("Error registering new user:", error);
				res.status(500).json({ message: "Failed to register user" });
			}
		});

// Authenticate user and log in
app.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (user && (await bcrypt.compare(req.body.password, user.password))) {
			const tokenPayload = {
				userId: user.userId,
				username: user.username,
			};
			const token = jwt.sign(
				tokenPayload,
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '2h' }
			);
			res.json({ token });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ message: "An error occurred during login" });
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
