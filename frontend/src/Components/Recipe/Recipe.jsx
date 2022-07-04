import "./Recipe.css"
import { Link } from "react-router-dom"
import AddReview from "../AddReview/AddReview"
import { useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../../Contexts/UserContext"
const Recipe = (props) => {
	const { user } = useContext(UserContext)
	const [showAddReview, setShowAddReview] = useState(false)
	const handleDelete = () => {
		axios({
			method: "delete",
			url: `http://localhost:5000/api/recipe`,
			data: { recipeId: props._id },
			headers: { authorization: window.localStorage.getItem("authorization") },
		})
			.then((res) => {
				alert(res.data)
				window.location = "/"
			})
			.catch((err) => alert(err.response.data))
	}
	return (
		<div className='recipe-div'>
			<Link to={`/recipe/${props._id}`} className='recipe-title'>
				{props.title}
			</Link>
			<Link to={`/user/${props.createdBy}`} className='recipe-creator'>
				{props.creatorLogin}
			</Link>
			<p className='recipe-createdAt'>{props.createdAt}</p>
			<p className='recipe-preparing'>{props.preparing}</p>
			<p
				className='recipe-add'
				onClick={() => setShowAddReview(!showAddReview)}>
				{!showAddReview ? `Add Review` : `Hide`}
			</p>
			{user.id == props.createdBy ? (
				<p onClick={handleDelete}>Delete recipe</p>
			) : null}
			{showAddReview ? <AddReview idOfRecipe={props._id} /> : null}
		</div>
	)
}

export default Recipe
