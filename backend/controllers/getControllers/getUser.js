const db = require("../../db/dbConnect")
const ObjectId = require("mongodb").ObjectId
const getUser = async (req, res, next) => {
	let id = ""
	try {
		id = ObjectId(req.params.id)
	} catch (err) {
		res.status(404).send("NOT FOUND")
		return
	}

	const user = await db
		.collection("users")
		.findOne({ _id: id }, { _id: 0, password: 0 })
	if (user) {
		res.send(user)
		return
	} else {
		res.status(404).send("NOT FOUND!")
	}
}
module.exports = getUser
