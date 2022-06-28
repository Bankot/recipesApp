const db = require("./dbConnect")
const { userSchema, recipeSchema, reviewSchema } = require("./schemas")

// db.createCollection("users", { validator: { $jsonSchema: userSchema } })
// db.createCollection("recipes", { validator: { $jsonSchema: recipeSchema } })
// db.createCollection("reviews", { validator: { $jsonSchema: reviewSchema } })
