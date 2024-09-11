import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, database } from "@/libs/firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export interface AuthContextProps {
  user: User | null | undefined;
  loading: boolean;
  userData: userDataProps;
  fetchUserData: (currentUser: User | null) => Promise<void>;
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

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [userData, setUserData] = useState<userDataProps>({} as userDataProps);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async (currentUser: User | null) => {
    if (currentUser) {
      const docRef = doc(database, "users", currentUser.uid);
      const querySnap = await getDoc(docRef);
      if (querySnap.exists()) {
        setUserData(querySnap.data() as userDataProps);
      }
    }
  }

  const value = { user, loading, userData, fetchUserData };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async(currentUser) => {
      setUser(currentUser);
      await fetchUserData(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribed();
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
