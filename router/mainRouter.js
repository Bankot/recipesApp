const express = require("express")

const router = express.Router()

router
	.route("/api/recipes")
	.get((req, res) => res.send("Hello its recipes get section"))

router
	.route("/api/user:id")
	.get((req, res) => res.send("Hello its the users get section"))

module.exports = router
