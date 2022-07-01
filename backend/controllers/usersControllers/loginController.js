const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../../db/dbConnect")
require("dotenv").config()

const loginController = async (req, res) => {
	const { login, password } = req.body
	if (typeof login === "string" && typeof password === "string") {
		const user = await db.collection("users").findOne({ login: login })
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ _id: user._id.toString(), login: login },
				process.env.JWT_SECRET
			)
			res.json({ status: "ok", token: token })
		} else {
			res.status(400).send("Credentials not matching")
		}
	} else res.status(400).send("Please provide all required information.")
}
module.exports = loginController
