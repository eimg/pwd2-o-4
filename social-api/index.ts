import express from "express";
const app = express();

import { router as postsRouter } from "./routes/posts";
app.use(postsRouter);

app.get("/", (req, res) => {
	res.json({ status: "Social API running..." });
});

app.listen(8800, () => {
	console.log("Social API running at 8800...");
});
