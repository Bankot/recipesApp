const db = require("../../db/dbConnect")
const ObjectId = require("mongodb").ObjectId

const getReview = async (req, res, next) => {
	let id = ""
	try {
		id = ObjectId(req.params.id)
	} catch (err) {
		res.status(404).send("NOT FOUND")
		return
	}
	try {
		const recipes = await db.collection("reviews").findOne({ _id: id })
		res.send(recipes)
	} catch (err) {
		next(err)
	}
}
module.exports = getReview
