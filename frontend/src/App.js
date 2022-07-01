import Form from "./Components/Form/Form"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./app.css"
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<Form />} />
				<Route path='/register' element={<Form register='true' />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
