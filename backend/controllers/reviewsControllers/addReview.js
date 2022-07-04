const { ObjectId } = require("mongodb")
const db = require("../../db/dbConnect")

const addReview = async (req, res, next) => {
	const { login, _id } = req.user
	const { review, rate, reviewdRecipeId } = req.body

	const exists = await db.collection("reviews").findOne({
		createdBy: _id,
		reviewdRecipeId: reviewdRecipeId,
	})
	const recipeExists = await db.collection("recipes").findOne({
		_id: ObjectId(reviewdRecipeId),
	})
	if (exists) {
		res.status(400).send("You have already posted a review: " + exists._id)
		return
	}
	if (!recipeExists) {
		res.status(400).send("Recipe doesnt exist!")
		return
	}
	if (login && _id && review && rate && reviewdRecipeId) {
		const { insertedId } = await db.collection("reviews").insertOne({
			reviewdRecipeId: reviewdRecipeId,
			creatorLogin: login,
			review: review,
			rate: rate,
			createdBy: _id,
			createdAt: new Date(),
		})
		await db
			.collection("recipes")
			.updateOne(
				{ _id: ObjectId(reviewdRecipeId) },
				{ $push: { reviewsId: insertedId.toString() } }
			)

		// add record to the author's profile

		await db
			.collection("users")
			.updateOne(
				{ _id: ObjectId(_id) },
				{ $push: { reviewsId: insertedId.toString() } }
			)
		res.send("Succesfully added a review")
	} else res.status(400).send("Please provide all needed data!")
}
module.exports = addReview
