import "./Recipe.css"
const Recipe = (props) => {
	let ingredientsKeys = Object.keys(props.ingredients)
	let ingredients = []
	ingredientsKeys.map((n) => {
		ingredients.push(`${n} : ${props.ingredients[n]}g `)
	})
	//MAKE IT SIMPLER
	console.log(ingredients)
	console.log(props.ingredients)
	return (
		<div className='recipe-div'>
			<h2 className='recipe-title'>{props.description}</h2>
			<p className='recipe-ingredients'>{ingredients}</p>
			<p className='recipe-creator'>{props.creatorLogin}</p>
			<p className='recipe-rating'>{props.rating}</p>
			<p className='recipe-preparing'>{props.preparing}</p>
			<p className='recipe-macros'>{props.macro}</p>
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
