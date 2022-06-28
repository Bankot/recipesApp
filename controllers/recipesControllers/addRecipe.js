const jwt = require("jsonwebtoken")
const db = require("../../db/dbConnect")

const addRecipe = async (req, res) => {
	const { ingredients, preparing, description, macro } = req.body
	const { login, _id } = req.user
	console.log(login)

	// if auth
}
module.exports = addRecipe
