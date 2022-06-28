const { MongoClient, ServerApiVersion } = require("mongodb")

const uri =
	"mongodb+srv://filip:2341@recipesapp.lh28ian.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})
client.connect((err) => {
	const collection = client.db("recipeApp").collection("recipes")
	console.log(collection.find({}).explain())
	// perform actions on the collection object
})
const run = async () => {
	const collection = await client.db("recipeApp").collection("recipes")
	console.log(await collection.find({}).toArray())
}
run()
