import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const UserPage = () => {
	let { id } = useParams()
	const [message, setMessage] = useState("")
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/user/${id}`)
			.then((res) => setMessage(res.data.login))
			.catch((err) => setMessage(err.response.data))
	}, [])

	return <h1>{message}</h1>
}

export default UserPage
