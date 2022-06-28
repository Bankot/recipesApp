const jwt = require("jsonwebtoken")
require("dotenv").config()
const authenticationMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Error("No token provided")
	}

	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log(decoded)
		const { _id, login } = decoded
		req.user = { _id, login }
		console.log(login)
		next()
	} catch (error) {
		throw new Error("Not authorized to access this route")
	}
}

module.exports = authenticationMiddleware
