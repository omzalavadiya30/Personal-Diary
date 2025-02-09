import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signup from './user-auth/Register'
import Login from "./user-auth/Login"
import Diary from "./component/Diary"
import { Errorpage } from "./errorpage/Errorpage"
import { useState,useEffect } from "react"

function App() {
  const [login, setLogin] = useState();
  const loggedInUser = localStorage.getItem("user");


  useEffect(() => {
    if (loggedInUser) {
      setLogin(true)
    } else {
      setLogin(false);
    }
  }, [loggedInUser]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        {
          login === false || login == " " || login == null ? (
          <>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Login setLogin={setLogin} />}/>
          <Route path="/diary" element={<Navigate to='/sign-in' />}/> 
          <Route path="/*" element={<Errorpage />}/>
            </>
          )  : (
            <>
            <Route path="/diary" element={<Diary setLogin={setLogin} />}/>
            <Route path="/sign-in" element={<Navigate to='/diary' />}/> 
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/*" element={<Errorpage />}/>
            </>
          )
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App