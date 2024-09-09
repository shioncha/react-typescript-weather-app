import { useEffect, useState } from "react"
import { Navigate, Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, sendEmailVerification, User, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/libs/firebase/FirebaseConfig"

const Login = () => {
  const [user, setUser] = useState<User | null>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then ((userCredential) => {
        if (!userCredential.user.emailVerified) {
          sendEmailVerification(userCredential.user);
          signOut(auth);
          navigate("/verify");
        }
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        alert("ログインに失敗しました");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? <p>Loading...</p> :
        <>
          {user?.email ? <Navigate to="/" /> : (
            <>
              <h1>ログイン</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">メールアドレス</label>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">パスワード</label>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">ログイン</button>
                <p>アカウントを持っていない場合は<Link to="/signup">こちら</Link></p>
              </form>
            </>
          )}
        </>
      }
    </>
)}

export default Login
