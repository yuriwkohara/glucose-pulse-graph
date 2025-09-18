import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type SubscriptionPlan = "grátis" | "gold" | "fit" | "pro";

type AuthState = {
  name: string;
  plan: SubscriptionPlan;
};

type AuthContextValue = {
  user: AuthState | null;
  showUserInfo: boolean;
  login: (name: string, plan: SubscriptionPlan) => void;
  logout: () => void;
  setShowUserInfo: (show: boolean) => void;
};

const STORAGE_KEY = "app_auth_user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthState | null>(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthState;
        if (parsed && parsed.name && parsed.plan) {
          setUser(parsed);
          // Se já tem usuário salvo, mostra as informações imediatamente
          setShowUserInfo(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback((name: string, plan: SubscriptionPlan) => {
    const next: AuthState = { name, plan };
    setUser(next);
    setShowUserInfo(true); // Mostra as informações após o login
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setShowUserInfo(false); // Esconde as informações ao fazer logout
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo(() => ({ user, showUserInfo, login, logout, setShowUserInfo }), [user, showUserInfo, login, logout, setShowUserInfo]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


