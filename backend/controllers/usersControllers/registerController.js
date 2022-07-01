const db = require("../../db/dbConnect")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const registerController = async (req, res, next) => {
	const { login, password } = req.body
	if (
		login &&
		password &&
		typeof login === "string" &&
		typeof password === "string"
	) {
		const exists = await db.collection("users").findOne({ login: login })
		if (!exists) {
			const hashedPassword = await bcrypt.hash(password, 10)

			const { insertedId } = await db.collection("users").insertOne({
				login: login,
				password: hashedPassword,
				createdAt: new Date(),
				recipesId: [],
				reviewsId: [],
			})
			const token = jwt.sign(
				{ _id: insertedId.toString(), login: login },
				process.env.JWT_SECRET
			)
			res.json({ status: "ok", token: token })
		} else res.status(400).send("User already exists!")
	} else res.status(400).send("Please provide all required information.")
}
module.exports = registerController
