import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Overview from "./pages/Overview/Overview";

function App() {
  const [showPopUp, setPopUp] = useState(false)


  return (
    <Router>
      <Header setPopUp={setPopUp} />
      <Routes>
        <Route path="/" element={<Home showPopUp={showPopUp} />}></Route>
        <Route path="/stuff/:category" element={<Overview showPopUp={showPopUp} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
