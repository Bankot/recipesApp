const userSchema = {
	bsonType: "object",
	required: ["login", "password", "createdAt", "recipesId"],
	properties: {
		login: {
			bsonType: "string",
		},
		password: {
			bsonType: "string",
		},
		createdAt: {
			bsonType: "date",
		},
		recipesId: {
			bsonType: "array",
		},
		reviewsId: {
			bsonType: "array",
		},
	},
}

const recipeSchema = {
	bsonType: "object",
	required: [
		"ingredients",
		"preparing",
		"createdAt",
		"createdBy",
		"reviewsId",
		"description",
		"macro",
	],
	properties: {
		ingredients: {
			bsonType: "array",
		},
		preparing: {
			bsonType: "string",
		},
		createdAt: {
			bsonType: "date",
		},
		createdBy: {
			bsonType: "string",
		},
		reviewsId: {
			bsonType: "string",
		},
		description: {
			bsonType: "string",
		},
		macro: {
			bsonType: "object",
		},
		rating: {
			bsonType: "int",
		},
	},
}

const reviewSchema = {
	bsonType: "object",
	required: ["review", "createdAt", "rate", "createdBy"],
	properties: {
		review: {
			bsonType: "string",
		},
		createdAt: {
			bsonType: "date",
		},
		rate: {
			bsonType: "int",
		},
		createdBy: {
			bsonType: "string",
		},
	},
}

module.exports = { userSchema, recipeSchema, reviewSchema }
