
import {Routes,Route } from "react-router-dom"
import Home from "./components/Home"
import Paper from "./components/Paper"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Papers" element={<Paper/>}/>
    </Routes>
  )
}

export default App
