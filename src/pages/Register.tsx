import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, User, sendEmailVerification } from "firebase/auth";
import { auth } from "@/libs/firebase/FirebaseConfig";

const Register = () => {
  const [user, setUser] = useState<User | null>();
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
        navigate("/verify")
        const user = userCredential.user;
        console.log(user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("登録に失敗しました");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })
  }, []);

  return (
    <>
      {loading ? <p>Loading...</p> : 
        <>
        {user?.email ? <Navigate to="/" /> : (
          <>
            <h1>新規登録</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <label htmlFor="password">パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button type="submit">登録</button>
              <p>既にアカウントを持っている場合は<Link to="/signin">こちら</Link></p>
            </form>
          </>
        )}
        </>
      }
    </>
  );
};

export default Register;
