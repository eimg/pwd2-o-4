import express from "express";
const app = express();
const port = Number(process.env.PORT) || 8800;

import cors from "cors";
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

import { router as postsRouter } from "./routes/posts.js";
app.use(postsRouter);

import { router as usersRouter } from "./routes/users.js";
app.use(usersRouter);

app.get("/", (req, res) => {
	res.json({ status: "Social API running..." });
});

app.listen(port, () => {
	console.log(`Social API running at ${port}...`);
});
