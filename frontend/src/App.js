import Form from "./Components/Form/Form"
import Navbar from "./Components/Navbar/Navbar"
import Dashboard from "./Components/Dashboard/Dashboard"
import { UserContextProvider } from "./Contexts/UserContext"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./app.css"
import UserPage from "./Components/UserPage/UserPage"
function App() {
	console.log("app refreshing")
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Navbar />
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/login' element={<Form />} />
					<Route path='/user/:id' element={<UserPage />} />
					<Route path='/register' element={<Form register='true' />} />
				</Routes>
			</UserContextProvider>
		</BrowserRouter>
	)
}

export default App
