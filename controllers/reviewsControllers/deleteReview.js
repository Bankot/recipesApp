const { ObjectId } = require("mongodb")
const { deleteFromParent } = require("../helpful-scripts")
const db = require("../../db/dbConnect")

const deleteReview = async (req, res, next) => {
	const { reviewId } = req.body
	const { _id } = req.user
	// checking if review exists
	let review = await db
		.collection("reviews")
		.findOne({ _id: ObjectId(reviewId) })
	if (review) {
		if (review.createdBy === _id) {
			const { reviewdRecipeId, createdBy } = review
			// deleting entries from users and recipes objects
			await deleteFromParent("recipes", reviewId, reviewdRecipeId, "reviewsId")
			await deleteFromParent("users", reviewId, createdBy, "reviewsId")
			// deleting review
			await db.collection("reviews").deleteOne({ _id: ObjectId(reviewId) })
		} else res.send("You are not owner, so you can't delete this!")
	} else res.send("No reviews matching this call")
}

module.exports = deleteReview
