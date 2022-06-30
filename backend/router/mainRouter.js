const express = require("express")
const authMiddleware = require("../middleware/auth")
const {
	addRecipe,
	addReview,
	deleteReview,
	deleteRecipe,
} = require("../controllers/index")
const {
	registerController,
	loginController,
} = require("../controllers/usersControllers/index")

const router = express.Router()

router
	.route("/api/recipe")
	.post(authMiddleware, addRecipe)
	.delete(authMiddleware, deleteRecipe)
router
	.route("/api/review")
	.post(authMiddleware, addReview)
	.delete(authMiddleware, deleteReview)

router.route("/api/userRegister").post(registerController)
router.route("/api/userLogin").post(loginController)

module.exports = router
