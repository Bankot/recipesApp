const addRecipe = require("./recipesControllers/addRecipe")
const addReview = require("./reviewsControllers/addReview")
const deleteReview = require("./reviewsControllers/deleteReview")
const deleteRecipe = require("./recipesControllers/deleteRecipe")
const getUser = require("./getControllers/getUser")
const getRecipe = require("./getControllers/getRecipe")
module.exports = {
	addRecipe,
	addReview,
	deleteReview,
	deleteRecipe,
	getUser,
	getRecipe,
}
