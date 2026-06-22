import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
  name: string;
  mode: "guest" | "demo" | "member";
}

interface UserCtx {
  user: UserData | null;
  signInAsGuest: () => void;
  signInAsDemo: () => void;
  signOut: () => void;
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const Ctx = createContext<UserCtx | null>(null);
const KEY = "atlas-oak-user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as UserData) : null;
    } catch {
      return null;
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEY);
    }
  }, [user]);

  const signInAsGuest = () => { setUser({ name: "Guest", mode: "guest" }); setIsOpen(false); };
  const signInAsDemo  = () => { setUser({ name: "Demo Customer", mode: "demo" }); setIsOpen(false); };
  const signOut       = () => { setUser(null); setIsOpen(false); };
  const openPanel     = () => setIsOpen(true);
  const closePanel    = () => setIsOpen(false);

  return (
    <Ctx.Provider value={{ user, signInAsGuest, signInAsDemo, signOut, isOpen, openPanel, closePanel }}>
      {children}
    </Ctx.Provider>
  );
}

export function useUser() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useUser must be used inside UserProvider");
  return c;
}
