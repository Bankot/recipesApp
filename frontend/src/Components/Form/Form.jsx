import { useState, useRef, useId } from "react"
import "./form.css"

const axios = require("axios")

const Form = (props) => {
	const [message, setMessage] = useState(null)
	const login = useRef(null)
	const password = useRef(null)
	const rpassword = useRef(null)
	const id = useId()

	const submitHandler = (e) => {
		localStorage.setItem("authorization", null)
		if (login.current.value && password.current.value) {
			setMessage(null)
			e.preventDefault()
			if (props.register) {
				if (password.current.value !== rpassword.current.value) {
					setMessage("Passwords aren't the same!")
					return
				}
			}
			const type = props.register ? "Register" : "Login"
			axios
				.post(`http://localhost:5000/api/user${type}`, {
					login: login.current.value,
					password: password.current.value,
				})
				.then((response) => {
					console.log(response)
					localStorage.setItem("authorization", "Bearer " + response.data.token)
					axios.defaults.headers.common["authorization"] =
						"Bearer " + response.data.token
					window.location.href = "/"
				})
				.catch((err) => setMessage(err.response.data))
		} else {
			setMessage("Provide all needed data!")
			return
		}
	}

	return (
		<form className='form-container' onSubmit={submitHandler}>
			<label htmlFor={`${id}-login`}>Login:</label>
			<input
				ref={login}
				className='form-input'
				id={`${id}-login`}
				placeholder='Login'></input>
			<label htmlFor={`${id}-password`}>Password:</label>
			<input
				ref={password}
				className='form-input'
				id={`${id}-password`}
				placeholder='Password'></input>
			{props.register ? (
				<>
					<label htmlFor={`${id}-rpassword`}>Repeat Password:</label>
					<input
						ref={rpassword}
						className='form-input'
						id={`${id}-rpassword`}
						placeholder='Repeat password'></input>
				</>
			) : null}
			<button type='submit' className='form-button'>
				{props.register ? "Register" : "Log in"}
			</button>
			<p className='form-message'>{message}</p>
		</form>
	)
}

export default Form
