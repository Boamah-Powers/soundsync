import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		return res
			.status(403)
			.json({ message: "Authorization required! Kindly log in." });
	}

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" });
		}
		req.user = user.id;
		next();
	});
};
