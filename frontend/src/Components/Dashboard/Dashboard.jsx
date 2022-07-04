import { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import AddRecipe from "../AddRecipe/AddRecipe"

const Dashboard = () => {
	const data = window.localStorage.getItem("authorization")
	const [userId, setUserId] = useState(null)
	const [login, setLogin] = useState(null)

	useEffect(() => {
		const data = window.localStorage.getItem("authorization")
		if (data) {
			let token = data.slice(7)
			let { _id, login } = jwt_decode(token)

			if (_id && login) {
				setUserId(_id)
				setLogin(login)
			}
		}
	}, [login])
	return <AddRecipe />
}

export default Dashboard
