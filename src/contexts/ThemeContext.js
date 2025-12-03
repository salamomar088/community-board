import { createContext, useContext, useEffect, useState } from "react";

const themeCtx = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || saved === "light" ? saved : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <themeCtx.Provider value={{ theme, toggle }}>{children}</themeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(themeCtx);
}
