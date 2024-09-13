import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "@/libs/firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        if (!userCredential.user.emailVerified) {
          sendEmailVerification(userCredential.user);
          signOut(auth);
          navigate("/verify");
        } else {
          const getUserData = async () => {
            const docRef = doc(database, "users", userCredential.user.uid);
            return await getDoc(docRef);
          };
          if (!(await getUserData()).data()) {
            navigate("/setup");
          } else {
            navigate("/");
          }
        }
      })
      .catch(() => {
        alert("ログインに失敗しました");
      });
  };

  return (
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
        <p>アカウントを持っていない場合は<Link to="/signup/">こちら</Link></p>
      </form>
    </>
)}

export default Login
