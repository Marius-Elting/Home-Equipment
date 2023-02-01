import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import Alert from "./components/Alert/Alert";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Overview from "./pages/Overview/Overview";

function App() {
  const [showPopUp, setPopUp] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertSetting, setalertSetting] = useState({})


  return (
    <Router>
      <Header setPopUp={setPopUp} showAlert={showAlert} alertSetting={alertSetting} />
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/home" />}>
        </Route>
        <Route path="/home" element={<Home showPopUp={showPopUp} setPopUp={setPopUp} setShowAlert={setShowAlert} setalertSetting={setalertSetting} />}></Route>
        <Route path="/stuff/:category" element={<Overview showPopUp={showPopUp} setPopUp={setPopUp} setShowAlert={setShowAlert} setalertSetting={setalertSetting} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
