import { createContext, useContext, useEffect, useState } from "react";

export type BaseMode = "dark" | "light";

interface ThemeContextValue {
  mode: BaseMode;
  isDark: boolean;
  setMode: (m: BaseMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  isDark: false,
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<BaseMode>(() => {
    const saved = localStorage.getItem("ouwibo-mode") as BaseMode | null;
    return saved === "light" || saved === "dark" ? saved : "light";
  });

  const setMode = (nextMode: BaseMode) => {
    setModeState(nextMode);
    localStorage.setItem("ouwibo-mode", nextMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.setAttribute("data-theme", mode);
    root.removeAttribute("data-accent");
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, isDark: mode === "dark", setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
