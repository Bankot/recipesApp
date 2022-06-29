const db = require("../db/dbConnect")
const { ObjectId } = require("mongodb")
const returnIfExists = async (collection, searchObj) => {
	if (searchObj)
		try {
			const record = await db.collection(collection).findOne(searchObj)
			if (record) {
				return record
			} else return false
		} catch (err) {
			throw new Error("Error occured while checking if record exists!")
		}
}
const deleteFromParent = async (
	collection,
	idOfElement,
	idOfParentElement,
	arrPropName
) => {
	let array = await db
		.collection(collection)
		.findOne({ _id: ObjectId(idOfParentElement) })
	const index = array[arrPropName].indexOf(idOfElement)
	if (index >= 0) array[arrPropName].splice(index, 1)
	console.log(array[arrPropName])
	db.collection(collection)
		.updateOne(
			{ _id: ObjectId(idOfParentElement) },
			{ $set: { [arrPropName]: array[arrPropName] } }
		)
		.then()
}
module.exports = { returnIfExists, deleteFromParent }
