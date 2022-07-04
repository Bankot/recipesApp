import { Link } from "react-router-dom"
import "./Review.css"
import axios from "axios"
import { UserContext } from "../../Contexts/UserContext"
import { useContext } from "react"

const Review = (props) => {
	const { user } = useContext(UserContext)
	const handleDelete = () => {
		axios({
			method: "delete",
			url: `http://localhost:5000/api/review`,
			data: { reviewId: props._id },
			headers: { authorization: window.localStorage.getItem("authorization") },
		})
			.then((res) => {
				alert(res.data)
				window.location = `/recipe/${props.reviewdRecipeId}`
			})
			.catch((err) => alert(err.response.data))
	}
	return (
		<div className='review-div'>
			<Link className='review-author' to={`/user/${props.createdBy}`}>
				{props.creatorLogin}
			</Link>
			<p className='review-content'>{props.review}</p>
			<p className='review-createdAt'>{props.createdAt}</p>
			<p className='review-rating'>Rating: {props.rate}/5</p>
			{user.id == props.createdBy ? (
				<p onClick={handleDelete}>Delete Review</p>
			) : null}
		</div>
	)
}

export default Review
