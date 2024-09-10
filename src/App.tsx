import { BrowserRouter } from "react-router-dom"

import Header from "@/components/Header"
import { AuthProvider } from "@/context/auth"
import Router from "@/Router"

const App = () => {
  return (
    <AuthProvider>
      <div className="container">
        <BrowserRouter>
          <Header />
          <main>
            <Router />
          </main>
        </BrowserRouter>
      </div>
    </AuthProvider>
)}

export default App
