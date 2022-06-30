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
	let parent = await db
		.collection(collection)
		.findOne({ _id: ObjectId(idOfParentElement) })
	const index = parent[arrPropName].indexOf(idOfElement)
	// this array contains id's of elements, we want to delete one of them: (idOfElement)
	if (index >= 0) parent[arrPropName].splice(index, 1)
	// deleting (idOfElement from arr)
	await db
		.collection(collection)
		.updateOne(
			{ _id: ObjectId(idOfParentElement) },
			{ $set: { [arrPropName]: array[arrPropName] } }
		)
	//setting new array without (idOfElement) in it
}
module.exports = { returnIfExists, deleteFromParent }
