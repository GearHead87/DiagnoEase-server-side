const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
	origin: ["http://localhost:5173", "http://localhost:5174"],
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify jwt middleware
const verifyToken = (req, res, next) => {
	const token = req.cookies?.token;
	if (!token) return res.status(401).send({ message: "unauthorized access" });
	if (token) {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				console.log(err);
				return res.status(401).send({ message: "unauthorized access" });
			}
			req.user = decoded;
			next();
		});
	}
};

// mongoDB database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ahe248t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

async function run() {
	try {
		// Connect the client to the server	(optional starting in v4.7)
		// await client.connect();

		const db = client.db("DiagnoEaseDB");
		const usersCollection = db.collection("users");
		const testsCollection = db.collection("tests");
		const appointmentsCollection = db.collection("appointments");
		const testResultsCollection = db.collection("testResults");
		const bannersCollection = db.collection("banners");
		const recommendationsCollection = db.collection("recommendations");

		//creating JWT Token
		app.post("/jwt", async (req, res) => {
			const user = req.body;
			// console.log("user for token", user);
			const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

			res.cookie("token", token, cookieOptions).send({ success: true });
		});

		//clearing JWT Token
		app.post("/logout", async (req, res) => {
			const user = req.body;
			// console.log("logging out", user);
			res
				.clearCookie("token", { ...cookieOptions, maxAge: 0 })
				.send({ success: true });
		});

		// API Services

		// User Collection
		app.post("/user", async (req, res) => {
			const userdata = req.body;
			const result = await usersCollection.insertOne(userdata);
			res.send(result);
		});

		app.get("/users", async (req, res) => {
			const result = await usersCollection.find().toArray();
			res.send(result);
		});
		app.get("/user/:email", async (req, res) => {
			const userEmail = req.params.email;
			const query = { email: userEmail };
			const result = await usersCollection.findOne(query);
			res.send(result);
		});
		app.patch("/user/:id", async (req, res) => {
			const userData = req.body;
			const id = req.params.id;
			const updateDoc = {
				$set: {
					...userData,
				},
			};
			const query = { _id: new ObjectId(id) };
			const result = await usersCollection.updateOne(query, updateDoc);
			res.send(result);
		});

		// Test Collection
		app.post("/test", async (req, res) => {
      const testData = req.body;
      const result = await testsCollection.insertOne(testData);
      res.send(result)
    });

		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Your Server is Running");
});

app.listen(port, () => {
	console.log(`Server is running on: http://localhost:${port}/`);
});
