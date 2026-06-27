import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const router = express.Router();

import { auth } from "../middlewares/auth.js";

router.get("/verify", auth, async (req, res) => {
	const id = res.locals.user.id as number;
    const user = await prisma.user.findUnique({
        where: { id }
    });

    res.json(user);
});

router.get("/users/:id", async (req, res) => {
	const id = Number(req.params?.id);

	if (!Number.isInteger(id)) {
		return res.status(400).json({ msg: "invalid user id" });
	}

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			username: true,
			bio: true,
			create: true,
			posts: {
				orderBy: { id: "desc" },
				include: {
					user: true,
					comments: true,
					likes: {
						select: {
							userId: true,
						},
					},
				},
			},
		},
	});

	if (!user) {
		return res.status(404).json({ msg: "user not found" });
	}

	res.json(user);
});

router.post("/login", async (req, res) => {
	const username = req.body?.username;
	const password = req.body?.password;

	if (!username || !password) {
		return res
			.status(400)
			.json({ msg: "username and password are required" });
	}

	const user = await prisma.user.findUnique({
		where: { username },
	});

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ id: user.id },
				process.env.JWT_SECRET as string,
			);

			return res.json({ user, token });
		}
	}

	res.status(401).json({ msg: "invalid username or password" });
});

router.post("/users", async (req, res) => {
	const name = req.body?.name;
	const username = req.body?.username;
	const bio = req.body?.bio;
	const password = req.body?.password;

	if (!name || !username || !password) {
		return res
			.status(400)
			.json({ msg: "name, username and password are required" });
	}

	const user = await prisma.user.create({
		data: {
			name,
			username,
			bio,
			password: await bcrypt.hash(password, 10),
		},
	});

	res.status(201).json(user);
});
