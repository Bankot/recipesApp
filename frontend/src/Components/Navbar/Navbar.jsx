import { useState, useEffect } from "react"
import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
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
					<Link className='navbar-item' to={`/user/${userId}`}>
						{login}
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
