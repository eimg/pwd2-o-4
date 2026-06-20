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
            likes: {
                select: {
                    userId: true,
                },
            },
        }
    });

    res.json(posts);
});

router.post("/posts", auth, async (req, res) => {
    const id = res.locals.user.id;

    const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
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
            likes: {
                select: {
                    userId: true,
                },
            },
        }
    });

    res.json(post);
});

router.delete("/posts/:id", auth, async (req, res) => {
    const userId = res.locals.user.id;
    const id = Number(req.params?.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ msg: "invalid post id" });
    }

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        return res.status(404).json({ msg: "post not found" });
    }

    if (post.userId !== userId) {
        return res.status(403).json({ msg: "only the post owner can delete it" });
    }

    await prisma.$transaction([
        prisma.like.deleteMany({
            where: { postId: id },
        }),
        prisma.comment.deleteMany({
            where: { postId: id },
        }),
        prisma.post.delete({
            where: { id },
        }),
    ]);

    res.status(204).send();
});

router.post("/posts/:id/likes", auth, async (req, res) => {
    const userId = res.locals.user.id;
    const postId = Number(req.params?.id);

    if (!Number.isInteger(postId)) {
        return res.status(400).json({ msg: "invalid post id" });
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        return res.status(404).json({ msg: "post not found" });
    }

    const like = await prisma.like.upsert({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
        update: {},
        create: {
            userId,
            postId,
        },
    });

    res.status(201).json(like);
});

router.delete("/posts/:id/likes", auth, async (req, res) => {
    const userId = res.locals.user.id;
    const postId = Number(req.params?.id);

    if (!Number.isInteger(postId)) {
        return res.status(400).json({ msg: "invalid post id" });
    }

    await prisma.like.deleteMany({
        where: {
            userId,
            postId,
        },
    });

    res.status(204).send();
});

router.post("/posts/:id/comments", auth, async (req, res) => {
    const userId = res.locals.user.id;
    const postId = Number(req.params?.id);
    const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";

    if (!Number.isInteger(postId)) {
        return res.status(400).json({ msg: "invalid post id" });
    }

    if (!content) {
        return res.status(400).json({ msg: "content is required" });
    }

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        return res.status(404).json({ msg: "post not found" });
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            userId,
            postId,
        },
        include: {
            user: true,
        },
    });

    res.status(201).json(comment);
});

router.delete("/comments/:id", auth, async (req, res) => {
    const userId = res.locals.user.id;
    const id = Number(req.params?.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ msg: "invalid comment id" });
    }

    const comment = await prisma.comment.findUnique({
        where: { id },
    });

    if (!comment) {
        return res.status(404).json({ msg: "comment not found" });
    }

    if (comment.userId !== userId) {
        return res.status(403).json({ msg: "only the comment owner can delete it" });
    }

    await prisma.comment.delete({
        where: { id },
    });

    res.status(204).send();
});
