import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

const authCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  // 🔄 Restore auth on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // 🔐 SIGN IN (LOGIN)
  async function signIn({ email, password }) {
    if (!email || !password) {
      return toast.error("Fill Email And Password");
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      toast.success("Signed In");
      nav("/");
    } catch (err) {
      toast.error(err.message);
    }
  }

  // 📝 SIGN UP (REGISTER)
  async function signUp({ name, email, password }) {
    if (!name || !email || !password) {
      return toast.error("Fields Should not be Empty");
    }

    try {
      await api.post("/auth/register", {
        fullname: name,
        username: email.split("@")[0], // auto username
        email,
        password,
      });

      toast.success("Account Created");

      // auto login after register
      await signIn({ email, password });
    } catch (err) {
      toast.error(err.message);
    }
  }

  // 🚪 SIGN OUT
  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast("Signed out");
    nav("/login");
  }

  return (
    <authCtx.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {!loading && children}
    </authCtx.Provider>
  );
}

export function useAuth() {
  return useContext(authCtx);
}
