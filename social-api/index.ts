import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

app.get("/", (req, res) => {
	res.json({ status: "Social API running..." });
});

app.get("/users", async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
});

app.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany({
		take: 10,
		orderBy: { id: "desc" },
	});
    res.json(posts);
});

app.listen(8800, () => {
	console.log("Social API running at 8800...");
});
