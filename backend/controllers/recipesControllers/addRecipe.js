const db = require("../../db/dbConnect")
const { ObjectId } = require("mongodb")
const addRecipe = async (req, res, next) => {
	const { preparing, title } = req.body
	const { login, _id } = req.user

	if (login && _id && preparing && title) {
		const { insertedId } = await db.collection("recipes").insertOne({
			preparing: preparing,
			title: title,
			createdAt: new Date(),
			createdBy: _id,
			reviewsId: [],
			creatorLogin: login,
		})
		//add record to the author's profile
		await db
			.collection("users")
			.updateOne(
				{ _id: ObjectId(_id) },
				{ $push: { recipesId: insertedId.toString() } }
			)
		res.send({ msg: "Adding recipe succesfull", recipeId: insertedId })
	} else res.status(400).send("Provide all needed informations!")
}
module.exports = addRecipe
