import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "@/context/auth";

const Top = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div style={{textAlign: "center", display: "flex", flexDirection: "column"}}>
      <h1>Welcome to Sample Apps</h1>
      { user ? (
        <p><button onClick={() => navigate("/mypage/")}>Go to My Page</button></p>
      ) : (
        <>
          <button onClick={() => navigate("/signin/")}>Sign in</button>
          <button onClick={() => navigate("/signup/")}>Sign up</button>
        </>
      )}
    </div>
  )
}

export default Top;
