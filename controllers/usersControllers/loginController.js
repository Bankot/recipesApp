const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { checkIfRecordExists } = require("./helpful-scripts")

const loginController = async (req, res) => {
	const { login, password } = req.body
	if (typeof login === "string" && typeof password === "string") {
		try {
			const user = await checkIfRecordExists("users", "login", login)
			if (user && (await bcrypt.compare(password, user.password))) {
				const token = jwt.sign(
					{ _id: user._id.toString(), login: login },
					process.env.JWT_SECRET
				)
				res.json({ status: "ok", data: token })
			} else {
				res.send("Not matching")
			}
		} catch (err) {
			next(err)
		}
	} else res.send("Please provide all required information.")
}
module.exports = loginController
