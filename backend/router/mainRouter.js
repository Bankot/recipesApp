const express = require("express")
const authMiddleware = require("../middleware/auth")
const {
	addRecipe,
	addReview,
	deleteReview,
	deleteRecipe,
	getUser,
	getRecipe,
	getReview,
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

router.route("/api/recipe/:id").get(getRecipe)

router
	.route("/api/review")
	.post(authMiddleware, addReview)
	.delete(authMiddleware, deleteReview)

router.route("/api/review/:id").get(getReview)
router.route("/api/user/:id").get(getUser)
router.route("/api/userRegister").post(registerController)
router.route("/api/userLogin").post(loginController)

module.exports = router
