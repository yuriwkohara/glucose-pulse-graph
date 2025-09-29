import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, SubscriptionPlan } from "@/hooks/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";

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


  function handleBack() {
    navigate("/login");
  }

  const plans = [
    {
      key: "grátis" as SubscriptionPlan,
      label: "Free",
      subtitle: "Plano básico gratuito",
      price: "R$0,00",
      features: [
        "Monitoramento 24h da glicose",
        "Medições com máxima precisão"
      ],
      buttonText: "Começar Grátis"
    },
    {
      key: "gold" as SubscriptionPlan,
      label: "Future",
      subtitle: "Inclui previsão de glicose",
      price: "R$9,99",
      features: [
        "Monitoramento 24h da glicose",
        "Medições com máxima precisão",
        "Previsão da glicose futura"
      ],
      buttonText: "Assinar Agora"
    },
    {
      key: "fit" as SubscriptionPlan,
      label: "Fit",
      subtitle: "Adiciona criação de dieta",
      price: "R$19,99",
      features: [
        "Monitoramento 24h da glicose",
        "Medições com máxima precisão",
        "Criação de dieta personalizada"
      ],
      buttonText: "Assinar Agora"
    },
    {
      key: "pro" as SubscriptionPlan,
      label: "Glia+",
      subtitle: "Plano completo com todas as funcionalidades",
      price: "R$24,99",
      features: [
        "Monitoramento 24h da glicose",
        "Medições com máxima precisão",
        "Previsão da glicose futura",
        "Análise precisa de dados",
        "Criação de dieta personalizada"
      ],
      buttonText: "Assinar Agora",
      isComplete: true
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#3B5675] mb-4">Nossos Planos</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Olá, {userData.name}! Escolha o plano ideal para sua jornada de saúde. 
            Todos os planos incluem suporte completo e garantia de satisfação.
          </p>
        </div>

        {/* Planos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((planData) => {
            const isSelected = plan === planData.key;
            
            return (
              <Card 
                key={planData.key}
                className={`relative cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col ${
                  isSelected 
                    ? 'ring-2 ring-[#3B5675] shadow-lg' 
                    : 'hover:shadow-xl'
                }`}
                style={{
                  background: "linear-gradient(135deg, #FFFFFF 0%, #CAE5F2 100%)",
                  boxShadow: isSelected 
                    ? "0 20px 25px -5px rgba(59, 86, 117, 0.18)" 
                    : "0 10px 15px -3px rgba(59, 86, 117, 0.12)"
                }}
                onClick={() => {
                  setPlan(planData.key);
                  login(userData.name, planData.key);
                  navigate("/");
                }}
              >
                {/* Badge Completo para Glia+ */}
                {planData.isComplete && (
                  <Badge 
                    className="absolute -top-2 -right-2 bg-[#3B5675] text-white"
                  >
                    Completo
                  </Badge>
                )}

                <CardHeader className="text-center pb-6">
                  {/* Título e Subtítulo */}
                  <CardTitle className="text-2xl font-bold text-[#3B5675] mb-3">
                    {planData.label}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {planData.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center flex flex-col flex-grow px-6 pb-6">
                  {/* Preço */}
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-[#3B5675] flex items-baseline justify-center gap-1">
                      <span>{planData.price}</span>
                      {planData.key !== "grátis" && (
                        <span className="text-sm text-gray-500">/mês</span>
                      )}
                    </div>
                  </div>

                  {/* Funcionalidades */}
                  <div className="space-y-4 mb-8 flex-grow">
                    {planData.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-left">
                        <Check className="w-4 h-4 text-[#3B5675] mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botão - Sempre no final */}
                  <div className="mt-auto">
                    <Button
                      type="button"
                      className="w-full h-12 text-white font-medium rounded-lg"
                      style={{
                        backgroundColor: '#3B5675'
                      }}
                    >
                      {planData.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Botão Voltar */}
        <div className="flex justify-center mb-16">
          <Button
            type="button"
            onClick={handleBack}
            className="h-12 px-8 text-white font-medium rounded-lg"
            style={{
              backgroundColor: '#3B5675'
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

      </div>
    </div>
  );
}
