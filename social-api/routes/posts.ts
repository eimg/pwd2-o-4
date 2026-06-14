import express from "express";
import { prisma } from "../lib/prisma";

export const router = express.Router();

import { auth } from "../middlewares/auth";

router.get("/posts", async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: { id: "desc" },
        take: 20,
        include: {
            user: true,
            comments: true,
        }
    });

    res.json(posts);
});

router.post("/posts", auth, async (req, res) => {
    const id = res.locals.user.id;

    const content = req.body?.content;
    if(!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    const post = await prisma.post.create({
        data: {
            content,
            userId: id
        }
    });

    res.status(201).json(post);
});

router.get("/posts/:id", async (req, res) => {
    const id = req.params?.id;
    const post = await prisma.post.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: true,
            comments: {
                include: {
                    user: true,
                }
            },
        }
    });

    res.json(post);
});
