import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import userRoute from "./router/auth.js";

// Middlewares
const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000;

//Health Route

app.get("/api/health", (req, res) => {
	res.status(200).json({
		msg: "I'am doing good. Thanks for checking up on me",
	});
});

// users auth route
app.use("/api/v1/auth",userRoute)

app.listen(port, () => {
	connectDB();
	console.log(`Server running on port: ${port}`);
});
