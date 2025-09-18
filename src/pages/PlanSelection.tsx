import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, SubscriptionPlan } from "@/hooks/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function PlanSelection() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [plan, setPlan] = useState<SubscriptionPlan | undefined>(undefined);

  // Recupera os dados do usuário da navegação anterior
  const userData = location.state?.userData;

  // Se não há dados do usuário, redireciona para login
  if (!userData) {
    navigate("/login");
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    login(userData.name, plan);
    navigate("/");
  }

  function handleBack() {
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-medical-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-[#3B5675]">Escolha seu plano</CardTitle>
          <CardDescription className="text-[#3B5675]">
            Olá, {userData.name}! Selecione o plano ideal para você
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="text-center text-[#3B5675] font-medium">Nossos Planos</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {([
                  { key: "grátis", label: "Free", desc: "" },
                  { key: "gold", label: "Future", desc: "Recursos avançados" },
                  { key: "fit", label: "Fit", desc: "Para quem treina" },
                  { key: "pro", label: "Glia+", desc: "Tudo incluso" },
                ] as { key: SubscriptionPlan; label: string; desc: string }[]).map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setPlan(p.key)}
                    className={`rounded-lg border-2 p-5 text-left transition-all flex flex-col gap-3 min-h-[240px] ${
                      plan === p.key
                        ? "border-[#3B5675] bg-[#CAE5F2]/60"
                        : "border-[#CAE5F2] hover:border-[#3B5675]/60 bg-white"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="text-[#3B5675] font-semibold text-2xl">{p.label}</div>
                      {p.key === "grátis" && (
                        <div className="text-[#3B5675] font-semibold text-2xl">R$0,00</div>
                      )}
                      {p.key === "gold" && (
                        <div className="text-[#3B5675] font-semibold text-2xl">R$9,99</div>
                      )}
                      {p.key === "fit" && (
                        <div className="text-[#3B5675] font-semibold text-2xl">R$19,99</div>
                      )}
                      {p.key === "pro" && (
                        <div className="text-[#3B5675] font-semibold text-2xl">R$29,99</div>
                      )}
                    </div>
                    {p.key === "grátis" && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-[#3B5675] space-y-1">
                        <li>Monitoramento 24h da glicose</li>
                        <li>Medições com máxima precisão</li>
                      </ul>
                    )}
                    {p.key === "gold" && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-[#3B5675] space-y-1">
                        <li>Monitoramento 24h da glicose</li>
                        <li>Medições com máxima precisão</li>
                        <li>Previsão da glicose futura</li>
                      </ul>
                    )}
                    {p.key === "fit" && (
                      <ul className="mt-2 list-disc pl-5 text-sm text-[#3B5675] space-y-1">
                        <li>Monitoramento 24h da glicose</li>
                        <li>Medições com máxima precisão</li>
                        <li>Criação de dieta personalizada</li>
                      </ul>
                    )}
                    {p.key === "pro" && (
                      <div className="mt-2">
                        <ul className="list-disc pl-5 text-sm text-[#3B5675] space-y-1">
                          <li>Monitoramento 24h da glicose</li>
                          <li>Medições com máxima precisão</li>
                          <li>Previsão da glicose futura</li>
                          <li>Análise precisa de dados</li>
                          <li>Criação de dieta personalizada</li>
                        </ul>
                        <div className="mt-3 text-center">
                          <span className="text-sm font-bold text-[#3B5675]">TUDO INCLUSO!</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={handleBack}
                className="flex-1 hover:opacity-90 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #CAE5F2 0%, #3B5675 100%)",
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 hover:opacity-90 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #3B5675 0%, #CAE5F2 100%)",
                }}
              >
                Confirmar Plano
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
