const { ObjectId } = require("mongodb")
const { deleteFromParent } = require("../helpful-scripts")
const db = require("../../db/dbConnect")

// i know its looks complicated, will try to make code cleaner

const deleteRecipe = async (req, res, next) => {
	const { recipeId } = req.body
	const { _id } = req.user
	// checking if recipe even exists
	let recipe = await db
		.collection("recipes")
		.findOne({ _id: ObjectId(recipeId) })
	if (recipe) {
		if (recipe.createdBy === _id) {
			const { createdBy, reviewsId } = recipe
			await deleteFromParent("users", recipeId, createdBy, "recipesId")
			// we want to remove also reviews of deleted recipe
			if (reviewsId.length >= 1) {
				for (n in reviewsId) {
					// deleting review entries from users  who posted reviews to deleted recipe
					let review = await db
						.collection("reviews")
						.findOne({ _id: ObjectId(reviewsId[n]) })
					deleteFromParent("users", reviewsId[n], review.createdBy, "reviewsId")
				}
				// at the end deleting recipe, and all reviews
				await db.collection("recipes").deleteOne({ _id: ObjectId(recipeId) })
				await db.collection("reviews").deleteMany({ reviewdRecipeId: recipeId })
			}
			res.send("Succesfully deleted a recipe.")
		} else res.send("You are not owner, so you can't delete this!")
	} else res.send("No reviews matching this call")
}

module.exports = deleteRecipe
