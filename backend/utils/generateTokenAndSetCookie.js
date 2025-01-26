import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		// can not be accesble by js , only by http  and prevents xss
		httpOnly: true,
		// local host = http and in the production = https
		secure: process.env.NODE_ENV === "production",
		// prevents csrf attack
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};
