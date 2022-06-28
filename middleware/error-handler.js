const errorHandlerMiddleware = async (err, req, res, next) => {
	let customError = {
		statusCode: err.statusCode || 500,
		msg: err.message || "Something went wrong try again later",
	}
	// SCHEMA ERROR LOGIC

	if (err.message === "Document failed validation") {
		let response = ""
		const errInfo =
			err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied
		for (let i = 0; i < errInfo.length; i++) {
			const { propertyName } = errInfo[i]
			const { specifiedAs, consideredType } = errInfo[i].details[0]
			response += ` ${propertyName} expected <${specifiedAs.bsonType}> but got <${consideredType}> `
		}
		customError.message = response
		customError.statusCode = 400
	}
	return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
