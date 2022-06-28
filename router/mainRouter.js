const express = require("express")
const authMiddleware = require("../middleware/auth")
const addRecipe = require("../controllers/recipesControllers/addRecipe")
const {
	registerController,
	loginController,
} = require("../controllers/usersControllers/index")

const router = express.Router()

router.route("/api/addRecipe").post(authMiddleware, addRecipe)

router.route("/api/userRegister").post(registerController)
router.route("/api/userLogin").post(loginController)

module.exports = router
