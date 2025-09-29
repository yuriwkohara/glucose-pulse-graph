import { useAuth } from "@/hooks/auth-context";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default function AppHeader() {
  const { user, showUserInfo } = useAuth();
  const location = useLocation();

  // Páginas onde o nome e plano devem aparecer
  const showUserInfoPages = ['/', '/monitor', '/dieta'];
  const shouldShowUserInfo = showUserInfoPages.includes(location.pathname);

  // Função para mapear os planos internos para os nomes de exibição
  const getPlanDisplayName = (plan: string) => {
    const planMap: Record<string, string> = {
      'grátis': 'Free',
      'gold': 'Future',
      'fit': 'Fit',
      'pro': 'Glia+'
    };
    return planMap[plan] || plan;
  };

  return (
    <header className="w-full bg-medical-bg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        {user && showUserInfo && shouldShowUserInfo && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm text-[#3B5675] font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{getPlanDisplayName(user.plan)}</div>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="" alt={user.name} />
              <AvatarFallback className="bg-gray-300 text-gray-600">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}


