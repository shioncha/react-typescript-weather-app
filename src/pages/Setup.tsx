import { useEffect, useState } from "react";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, database } from "@/libs/firebase/FirebaseConfig";

const Setup = () => {
  const [user, setUser] = useState<User | null>();
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName) {
      alert("名前を入力してください");
      return
    }
    await setDoc(doc(database, "users", user?.uid as string), {
      createdAt: serverTimestamp(),
      email: user?.email,
      name: userName,
      uid: user?.uid
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
    });
  })

  return (
    <>
      <h1>アカウント情報の登録</h1>
      <p>利用を始める前に、アカウント情報の登録を行います。</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前</label>
        <input
          name="name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">登録</button>
      </form>
    </>
  )
}

export default Setup
