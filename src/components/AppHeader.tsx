import { useAuth } from "@/hooks/auth-context";
import { useLocation } from "react-router-dom";

export default function AppHeader() {
  const { user, showUserInfo } = useAuth();
  const location = useLocation();

  // Páginas onde o nome e plano devem aparecer
  const showUserInfoPages = ['/', '/monitor', '/dieta'];
  const shouldShowUserInfo = showUserInfoPages.includes(location.pathname);

  return (
    <header className="w-full bg-medical-bg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        {user && showUserInfo && shouldShowUserInfo && (
          <div className="text-right">
            <div className="text-sm text-[#3B5675] font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">plano: {user.plan}</div>
          </div>
        )}
      </div>
    </header>
  );
}


