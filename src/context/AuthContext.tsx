import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  user: string;
}

type AuthContextType = {
  userLogin: string | null;
  setuserLogin: Dispatch<SetStateAction<string | null>>;
  userId: string;
};

export const AuthContext = createContext<AuthContextType>({
  userLogin: null,
  setuserLogin: () => {},
  userId: "",
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userLogin, setuserLogin] = useState(() =>
    localStorage.getItem("user-token"),
  );
  const [userId, setuserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user-token");
    if (token) {
      const { user }: { user: string } = jwtDecode<TokenPayload>(token);(
        localStorage.getItem("user-token")
      );
      console.log(user);
      setuserId(user);
    }
  }, [userLogin]);

  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin, userId }}>
      {children}
    </AuthContext.Provider>
  );
}
