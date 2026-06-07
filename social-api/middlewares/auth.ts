import express from "express";
import jwt from "jsonwebtoken";

export function auth(
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) {
    const authorization = req.headers.authorization;
	const token = authorization?.split(" ")[1];

	if (token) {
		try {
			const data = jwt.verify(
				token,
				process.env.JWT_SECRET as string,
			);

			res.locals.user = data;
            return next();
		} catch (e) {
			return res.status(403).json({ msg: "invalid token" });
		}
	}

	res.status(403).json({ msg: "missing token" });
};
