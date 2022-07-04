import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Recipe from "../Recipe/Recipe"
import { UserContext } from "../../Contexts/UserContext"

const UserPage = () => {
	let { id } = useParams()
	const { user } = useContext(UserContext)
	const [message, setMessage] = useState("")
	const [fetchedUser, setFetchedUser] = useState({})
	const [recipes, setRecipes] = useState([])
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/user/${id}`)
			.then((res) => {
				setFetchedUser(res.data)
				if (res.data.recipesId) {
					res.data.recipesId.forEach((elem) => {
						axios
							.get(`http://localhost:5000/api/recipe/${elem}`)
							.then((res) => {
								// let recipe = <Recipe key={res.data._id} props={res.data} />
								setRecipes((recipes) => [...recipes, res.data])
							})
					})
				}
			})
			.catch((err) => setMessage(err.response.data))
	}, [id])
	let recipesList = recipes
		? recipes.map((n) => <Recipe key={n._id} {...n} />)
		: null

	return (
		<div>
			<h2>{fetchedUser.login}</h2>
			<p>{fetchedUser.createdAt}</p>
			<p>Recipes:</p>
			<div>{recipesList}</div>
		</div>
	)
}

export default UserPage
