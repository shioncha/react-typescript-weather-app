import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/libs/firebase/FirebaseConfig";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
        navigate("/verify");
      })
      .catch(() => {
        alert("登録に失敗しました");
      });
  };

  return (
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
        <p>既にアカウントを持っている場合は<Link to="/signin/">こちら</Link></p>
      </form>
    </>
  );
}

export default Register;
