import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import AuthLayout from "./layout/auth"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AuthLayout />}/>
      </Routes>
    </Router>
  )
}

export default App
