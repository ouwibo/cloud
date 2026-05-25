import { createContext, useContext, useEffect, useState } from "react";

export type AppTheme =
  | "midnight"   // blue
  | "aurora"     // purple
  | "forest"     // emerald
  | "ocean"      // cyan
  | "ember"      // orange
  | "rose"       // pink
  | "gold"       // amber
  | "light";     // day / warm beige

export interface ThemeInfo {
  id: AppTheme;
  label: string;
  swatch: string;
  dark: boolean;
}

export const THEME_LIST: ThemeInfo[] = [
  { id: "midnight", label: "Midnight", swatch: "#4f7ed4", dark: true  },
  { id: "aurora",   label: "Aurora",   swatch: "#8e68c8", dark: true  },
  { id: "forest",   label: "Forest",   swatch: "#3d9e73", dark: true  },
  { id: "ocean",    label: "Ocean",    swatch: "#2f9db5", dark: true  },
  { id: "ember",    label: "Ember",    swatch: "#d0612a", dark: true  },
  { id: "rose",     label: "Rose",     swatch: "#c04272", dark: true  },
  { id: "gold",     label: "Gold",     swatch: "#c19830", dark: true  },
  { id: "light",    label: "Day",      swatch: "#e8ddd0", dark: false },
];

interface ThemeContextValue {
  theme: AppTheme;
  setTheme: (t: AppTheme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "midnight",
  setTheme: () => {},
  isDark: true,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    const stored = localStorage.getItem("ouwibo-theme-v2");
    return (stored as AppTheme) ?? "midnight";
  });

  const isDark = THEME_LIST.find(t => t.id === theme)?.dark ?? true;

  function setTheme(t: AppTheme) {
    setThemeState(t);
    localStorage.setItem("ouwibo-theme-v2", t);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, isDark]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
