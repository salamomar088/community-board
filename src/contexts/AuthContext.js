import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const authCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  function signIn({ email, password }) {
    if (!email || !password) return toast.error("Fill Email And Password");

    const u = {
      id: "u1",
      name: "Omar",
      email,
      avatar: "https://i.pravatar.cc/80",
    };

    setUser(u);
    toast.success("Signed In");
    nav("/");
  }

  function signUp({ name, email, password }) {
    if (!name || !email || !password)
      return toast.error("Fields Should not be Empty");

    const u = {
      id: "u" + Date.now(),
      name,
      email,
      avatar: "https://i.pravatar.cc/80",
    };

    setUser(u);
    toast.success("Account Created");
    nav("/");
  }

  function signOut() {
    setUser(null);
    toast("Signed out");
  }

  return (
    <authCtx.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </authCtx.Provider>
  );
}

export function useAuth() {
  return useContext(authCtx);
}
