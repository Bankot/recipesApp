const { ObjectId } = require("mongodb")
const { returnIfExists, deleteFromParent } = require("../helpful-scripts")
const db = require("../../db/dbConnect")

const deleteReview = async (req, res, next) => {
	const { reviewId } = req.body
	const { _id } = req.user
	let review = await returnIfExists("reviews", { _id: ObjectId(reviewId) })
	if (review) {
		if (review.createdBy === _id) {
			const { reviewdRecipeId, createdBy } = review
			await deleteFromParent("recipes", reviewId, reviewdRecipeId, "reviewsId")
			await deleteFromParent("users", reviewId, createdBy, "reviewsId")
			await db.collection("reviews").deleteOne({ _id: ObjectId(reviewId) })
		} else res.send("You are not owner, so you can't delete this!")
	} else res.send("No reviews matching this call")
}

module.exports = deleteReview
