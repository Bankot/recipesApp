import Form from "./Components/Form/Form"
import Navbar from "./Components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./app.css"
function App() {
	return (
		<BrowserRouter>
			<Navbar></Navbar>
			<Routes>
				<Route path='/login' element={<Form />} />
				<Route path='/register' element={<Form register='true' />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
