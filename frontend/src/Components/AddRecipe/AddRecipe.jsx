import { useState, useRef } from "react"
import "./AddRecipe.css"
import axios from "axios"

const AddRecipe = (props) => {
	const [preparing, setPreparing] = useState("")
	const [message, setMessage] = useState("")
	const title = useRef()

	const handleClick = (e) => {
		console.log(preparing)
		console.log(title.current.value)
		axios({
			method: "post",
			url: `http://localhost:5000/api/recipe`,
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
			data: {
				preparing: preparing,
				title: title.current.value,
			},
		})
			.then((res) => {
				if (res.status == 200) {
					window.location = `/recipe/${res.data.recipeId}`
				}
			})
			.catch((err) => setMessage(err.response.data))
	}

	return (
		<div className='AddRecipe-container'>
			<label>Title: </label>
			<input ref={title}></input>
			<span
				className='AddRecipe-span'
				role='textbox'
				contentEditable
				onInput={(e) => {
					setPreparing(e.target.innerHTML)
				}}
			/>
			<button onClick={handleClick} className='AddRecipe-button'>
				Add Recipe
			</button>
			<p>{message}</p>
		</div>
	)
}

export default AddRecipe
