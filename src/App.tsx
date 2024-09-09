import { BrowserRouter, Routes, Route } from "react-router-dom"

import Weather from "@/pages/Weather"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import EmailVerification from "@/pages/EmailVerification"
import MyPage from "@/pages/MyPage"
import Dev from "@/pages/Dev"
import Setup from "@/pages/Setup"
import Header from "@/components/Header"

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path={'/weather/'} element={<Weather/>} />
          <Route path={'/signin/'} element={<Login/>} />
          <Route path={'/signup/'} element={<Register/>} />
          <Route path={'/verify/'} element={<EmailVerification/>} />
          <Route path={'/'} element={<MyPage/>} />
          <Route path={'/dev/'} element={<Dev/>} />
          <Route path={'/setup/'} element={<Setup/>} />
        </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
