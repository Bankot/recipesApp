import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Recipe from "../Recipe/Recipe"

const UserPage = () => {
	let { id } = useParams()
	const [message, setMessage] = useState("")
	const [user, setUser] = useState({})
	const [recipes, setRecipes] = useState([])
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/user/${id}`)
			.then((res) => {
				setUser(res.data)
				if (res.data.recipesId) {
					res.data.recipesId.forEach((elem) => {
						console.log(elem)
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
	}, [])
	let recipesList = recipes
		? recipes.map((n) => <Recipe key={n._id} {...n} />)
		: null
	console.log(recipesList)
	return (
		<div>
			<h2>{user.login}</h2>
			<p>{user.createdAt}</p>
			<p>Recipes:</p>
			<div>{recipesList}</div>
		</div>
	)
}

export default UserPage
