const db = require("../../db/dbConnect")

const checkIfRecordExists = async (collection, prop, value) => {
	try {
		const record = await db.collection(collection).findOne({ [prop]: value })
		if (record) {
			return record
		} else return false
	} catch (err) {
		throw new Error("Error occured while checking if record exists!")
	}
}
module.exports = { checkIfRecordExists }
