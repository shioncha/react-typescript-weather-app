import { useContext } from "react"
import { Route, Routes, Navigate } from "react-router-dom"

import { AuthContext } from "@/context/auth"
import MyPage from "@/pages/MyPage"
import Weather from "@/pages/Weather"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import EmailVerification from "@/pages/EmailVerification"
import Setup from "@/pages/Setup"
import Dev from "./pages/Dev"

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path={'/'} element={ user ? <MyPage/> : <Navigate to="/signin/"/>} />
      <Route path={'/weather/'} element={<Weather/>} />
      <Route path={'/signin/'} element={ !user ? <Login/> : <Navigate to="/"/> } />
      <Route path={'/signup/'} element={ !user ? <Register/> : <Navigate to="/"/>} />
      <Route path={'/verify/'} element={<EmailVerification/>} />
      <Route path={'/'} element={<MyPage/>} />
      <Route path={'/dev/'} element={<Dev/>} />
      <Route path={'/setup/'} element={<Setup/>} />
    </Routes>
  )
}

export default Router;
