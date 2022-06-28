const { MongoClient, ServerApiVersion } = require("mongodb")

const uri =
	"mongodb+srv://filip:2341@recipesapp.lh28ian.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})
module.exports = client.db("recipeApp")
