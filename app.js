import express from "express";
import cors from "cors";

// Middlewares
const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

//Health Route

app.get("/api/health", (req, res) => {
	res.status(200).json({
		msg: "I'am doing good. Thanks for checking up on me",
	});
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
