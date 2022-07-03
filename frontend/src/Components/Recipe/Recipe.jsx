import "./Recipe.css"
import { Link } from "react-router-dom"
const Recipe = (props) => {
	let ingredientsKeys = Object.keys(props.ingredients)
	let ingredients = []
	ingredientsKeys.map((n) => {
		ingredients.push(`${n} : ${props.ingredients[n]}g `)
	})
	//MAKE IT SIMPLER

	return (
		<div className='recipe-div'>
			<Link to={`/recipe/${props._id}`} className='recipe-title'>
				{props.description}
			</Link>
			<p className='recipe-ingredients'>{ingredients}</p>
			<p className='recipe-creator'>{props.creatorLogin}</p>
			<p className='recipe-rating'>{props.rating}</p>
			<p className='recipe-preparing'>{props.preparing}</p>
		</div>
	)
}
/*/ from schema
 		"ingredients",
		"preparing",
		"createdAt",
		"createdBy",
		"reviewsId",
		"description",
		"macro",
/*/
export default Recipe
