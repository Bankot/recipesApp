const db = require("./dbConnect")
const { userSchema, recipeSchema, reviewSchema } = require("./schemas")
const { checkIfRecordExists } = require("../controllers/helpful-scripts")

const reset = async () => {
	await db.dropCollection("users")
	await db.dropCollection("recipes")
	await db.dropCollection("reviews")
	await db.createCollection("users", { validator: { $jsonSchema: userSchema } })
	await db.createCollection("recipes", {
		validator: { $jsonSchema: recipeSchema },
	})
	await db.createCollection("reviews", {
		validator: { $jsonSchema: reviewSchema },
	})
}
reset()
// db.createCollection("users", { validator: { $jsonSchema: userSchema } })
// db.createCollection("recipes", { validator: { $jsonSchema: recipeSchema } })
// db.createCollection("reviews", { validator: { $jsonSchema: reviewSchema } })
