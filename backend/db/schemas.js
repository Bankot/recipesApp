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
	],
	properties: {
		ingredients: {
			bsonType: "object",
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
		creatorLogin: {
			bsonType: "string",
		},
		reviewsId: {
			bsonType: "array",
		},
		description: {
			bsonType: "string",
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
		creatorLogin: {
			bsonType: "string",
		},
		review: {
			bsonType: "string",
		},
		createdAt: {
			bsonType: "date",
		},
		rate: {
			bsonType: "int",
			minimum: 0,
			maximum: 5,
		},
		createdBy: {
			bsonType: "string",
		},
	},
}

module.exports = { userSchema, recipeSchema, reviewSchema }
