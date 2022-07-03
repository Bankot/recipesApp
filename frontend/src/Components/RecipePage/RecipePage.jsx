import Recipe from "../Recipe/Recipe"
import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

const RecipePage = (props) => {
	const { id } = useParams()
	const [recipe, setRecipe] = useState(null)
	useEffect(() => {
		axios.get(`http://localhost:5000/api/recipe/${id}`).then((res) => {
			setRecipe(<Recipe key={res.data._id} {...res.data} />)
		})
	}, [])
	return <>{recipe}</>
}

export default RecipePage
