import { useState, useEffect, useContext } from "react"
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom"
import { UserContext } from "../../Contexts/UserContext"
import "./Navbar.css"
const Navbar = () => {
	const [userId, setUserId] = useState(null)
	const [login, setLogin] = useState(null)
	const { user, setToken } = useContext(UserContext)
	// I decided to put this logic here, because thats the only component which is mounted all the time
	// Couldnt put it in App.js, because Context is accesible only in component below the one where you initiated it
	useEffect(() => {
		const token = window.localStorage.getItem("authorization")
		if (token) {
			setToken(token)
		}
		setLogin(user.login)
		setUserId(user.id)
	}, [])

	const handleLogOut = () => {
		window.localStorage.setItem("authorization", "")
		window.location.href = "/"
	}
	return (
		<ul className='navbar-ul'>
			<Link className='navbar-item' to='/'>
				Home
			</Link>
			{window.localStorage.getItem("authorization") ? (
				<>
					<Link className='navbar-item' to={`/user/${user.id}`}>
						{user.login}
					</Link>
					<a className='navbar-item' onClick={handleLogOut}>
						Log Out
					</a>
				</>
			) : (
				<>
					<Link className='navbar-item' to='/login'>
						Log In
					</Link>
					<Link className='navbar-item' to='/register'>
						Register
					</Link>
				</>
			)}
		</ul>
	)
}

export default Navbar
