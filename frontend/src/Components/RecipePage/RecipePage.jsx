import Recipe from "../Recipe/Recipe"
import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import Review from "../Review/Review"

const RecipePage = (props) => {
	const { id } = useParams()
	const [recipe, setRecipe] = useState(null)
	const [reviews, setReviews] = useState([])
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/recipe/${id}`)
			.then((res) => {
				setRecipe(<Recipe key={res.data._id} {...res.data} />)
				if (res.data.reviewsId) {
					res.data.reviewsId.forEach((elem) => {
						axios
							.get(`http://localhost:5000/api/review/${elem}`)
							.then((res) => {
								// let recipe = <Recipe key={res.data._id} props={res.data} />
								setReviews((reviews) => [...reviews, res.data])
							})
					})
				}
			})
			.catch((err) => alert(err.response.data))
	}, [])
	let reviewsList = reviews.map((n) => <Review key={n._id} {...n} />)
	console.log(reviews)
	return (
		<>
			{recipe}
			{reviewsList}
		</>
	)
}

export default RecipePage
