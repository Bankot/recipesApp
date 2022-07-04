import { useState } from "react"
import axios from "axios"
import "./AddReview.css"

const AddReview = (props) => {
	const [content, setContent] = useState("")
	const [message, setMessage] = useState("")
	const addReview = () => {
		axios({
			method: "post",
			url: `http://localhost:5000/api/review`,
			data: {
				reviewdRecipeId: props.idOfRecipe,
				review: content,
				rate: 4,
			},
			headers: {
				authorization: window.localStorage.getItem("authorization"),
			},
		})
			.then((res) => {
				if (res.status == 200) {
					window.location = `/recipe/${props.idOfRecipe}`
				}
			})
			.catch((err) => setMessage(err.response.data))
	}

	return (
		<div className='AddReview-container'>
			<span
				className='AddReview-span'
				role='textbox'
				contentEditable
				onInput={(e) => {
					setContent(e.target.innerHTML)
				}}
			/>
			<button onClick={addReview} className='AddReview-button'>
				Add Review
			</button>
			<p>{message}</p>
		</div>
	)
}

export default AddReview
