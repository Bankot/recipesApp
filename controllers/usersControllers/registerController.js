const db = require("../../db/dbConnect")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { checkIfRecordExists } = require("./helpful-scripts")

const registerController = async (req, res, next) => {
	const { login, password } = req.body
	if (typeof login === "string" && typeof password === "string") {
		try {
			const exists = await checkIfRecordExists("users", "login", login)
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
				res.json({ status: "ok", data: token })
			} else res.send("User already exists")
		} catch (err) {
			next(err)
		}
	} else res.send("Please provide all required information.")
}
module.exports = registerController
