const db = require("../../db/dbConnect")
const { ObjectId } = require("mongodb")
const addRecipe = async (req, res, next) => {
	const { ingredients, preparing, description, macro } = req.body
	const { login, _id } = req.user

	if (login && _id && ingredients && preparing && description) {
		const { insertedId } = await db.collection("recipes").insertOne({
			ingredients: ingredients,
			preparing: preparing,
			description: description,
			macro: macro,
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
		res.send("Adding recipe succesful!" + description)
	} else res.send("Provide all needed informations!")
}
module.exports = addRecipe
