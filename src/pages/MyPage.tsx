import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut, User } from "firebase/auth"
import { auth, database } from "@/libs/firebase/FirebaseConfig"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

interface todoProps {
  created_at: {
    nanoseconds: number,
    seconds: number
  },
  detail: string,
  uid: string
}

interface userDataProps {
  created_at: {
    nanoseconds: number,
    seconds: number
  },
  email: string,
  name: string,
  uid: string
}

const MyPage = () => {
  const [user, setUser] = useState<User | null>();
  const [userData, setUserData] = useState<userDataProps>({} as userDataProps);
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<todoProps[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      getUserData();
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/sighin/");
  }

  const getUserData = async () => {
    setLoading(true);
    const docRef = doc(database, 'users', auth.currentUser?.uid as string);
    const querySnap = await getDoc(docRef);
    setUserData(querySnap.data() as userDataProps);
    setLoading(false);
  }

  const getTodos = async () => {
    setTodos([]);
    const querySnap = await getDocs(collection(database, 'todos'));
    querySnap.forEach((doc) => {
      const todox: todoProps = doc.data() as todoProps;
      setTodos((todos) => [...todos, todox]);
    })
  }

  return (
    <>
      {loading ? <p>Loading...</p> :
        <>
          {!user?.email ? <Navigate to="/signin/" /> : (
            <>
              <h1>マイページ</h1>
              <p>ユーザー名: {userData?.name}</p>
              <p>メールアドレス: {user?.email}</p>
              {!auth.currentUser?.emailVerified && <p>メールアドレスを認証してください</p>}
              <button onClick={logout}>ログアウト</button>
              <button onClick={getTodos}>TODO一覧を取得</button>
              <ul>
                {todos.map((todo: todoProps, index) => <li key={index}>{todo.detail}</li>)}
              </ul>
            </>
          )}
        </>
      }
    </>
  )
}

export default MyPage;
