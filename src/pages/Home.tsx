import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Activity, TrendingUp, Shield, Zap, ArrowRight, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleMonitorClick = () => {
    navigate('/monitor');
  };

  const handleDietaClick = () => {
    navigate('/dieta');
  };

  return (
    <div
      className="min-h-screen bg-medical-bg"
      style={{
        // Override verdes por azul marinho apenas nesta página
        // Usamos valores HSL, conforme o design system
        // Accent controla partes que antes eram verdes (cards, ícones, gradientes)
        // Success também era verde em alguns ícones
        // Ex.: navy ~ hsl(220 60% 20%)
        // Mantemos o foreground branco para contraste
        // @ts-ignore: CSS custom properties
        '--accent': '220 60% 20%',
        // @ts-ignore: CSS custom properties
        '--accent-foreground': '0 0% 100%',
        // @ts-ignore: CSS custom properties
        '--success': '220 60% 20%',
        // @ts-ignore: CSS custom properties
        '--success-foreground': '0 0% 100%'
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <img 
                  src="/glia_logo.png" 
                  alt="GLIA - o futuro da saúde começa com PRECISÃO e excelência" 
                  className="h-72 md:h-[28rem] w-auto"
                  style={{
                    background: 'transparent',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center items-center">
              <Button 
                onClick={handleMonitorClick}
                size="lg"
                className="hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl text-lg"
                style={{
                  background: 'linear-gradient(135deg, #3B5675 0%, #CAE5F2 100%)'
                }}
              >
                <Activity className="mr-3 h-5 w-5" />
                Monitor de Glicose
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              <Button 
                onClick={handleDietaClick}
                size="lg"
                className="hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl text-lg"
                style={{
                  background: 'linear-gradient(135deg, #3B5675 0%, #CAE5F2 100%)'
                }}
              >
                <Utensils className="mr-3 h-5 w-5" />
                Dieta Personalizada
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl font-bold text-[#3B5675]">
            Recursos Avançados
          </h2>
          <p className="text-lg text-muted-foreground">
            Tecnologia de ponta para o cuidado da sua saúde
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <Activity className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Monitoramento em Tempo Real</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Acompanhe seus níveis de glicose continuamente com atualizações em tempo real e alertas inteligentes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Previsões Inteligentes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                IA avançada prevê seus níveis glicêmicos com 98,5% de precisão para os próximos 60 minutos.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <Shield className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Segurança Garantida</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Seus dados são protegidos com criptografia de nível bancário e nunca são compartilhados.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <Zap className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Alertas Inteligentes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receba notificações instantâneas quando seus níveis saem da faixa normal.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <Activity className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Análise de Tendências</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Visualize padrões e tendências nos seus dados para melhor compreensão da sua saúde.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#CAE5F2] rounded-lg">
                  <Heart className="h-6 w-6 text-[#3B5675]" />
                </div>
                <CardTitle className="text-xl">Interface Intuitiva</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Design moderno e fácil de usar, desenvolvido pensando na experiência do usuário.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
};

export default Home;
