import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, CheckCircle, Circle } from "lucide-react";

export default function CalendarioRefeicoes() {
  const navigate = useNavigate();
  const [dataSelecionada, setDataSelecionada] = useState(23); // 23 de setembro
  const [refeicoesConcluidas, setRefeicoesConcluidas] = useState<{[key: string]: boolean}>({
    'cafe-manha-1': false,
    'cafe-manha-2': false,
    'cafe-manha-3': false,
    'cafe-manha-4': false,
    'almoco-1': false,
    'almoco-2': false,
    'almoco-3': false,
    'almoco-4': false,
    'jantar-1': false,
    'jantar-2': false,
    'jantar-3': false,
    'jantar-4': false,
  });

  const handleCheckboxChange = (itemId: string) => {
    setRefeicoesConcluidas(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const refeicoes = {
    cafeManha: {
      horario: "08:00",
      nome: "Café da Manhã",
      itens: [
        { id: 'cafe-manha-1', nome: 'Aveia com frutas' },
        { id: 'cafe-manha-2', nome: 'Leite desnatado' },
        { id: 'cafe-manha-3', nome: 'Banana' },
        { id: 'cafe-manha-4', nome: 'Chia' }
      ]
    },
    almoco: {
      horario: "12:00",
      nome: "Almoço",
      itens: [
        { id: 'almoco-1', nome: 'Frango grelhado' },
        { id: 'almoco-2', nome: 'Arroz integral' },
        { id: 'almoco-3', nome: 'Salada verde' },
        { id: 'almoco-4', nome: 'Brócolis' }
      ]
    },
    jantar: {
      horario: "19:00",
      nome: "Jantar",
      itens: [
        { id: 'jantar-1', nome: 'Peixe assado' },
        { id: 'jantar-2', nome: 'Batata doce' },
        { id: 'jantar-3', nome: 'Vegetais refogados' },
        { id: 'jantar-4', nome: 'Azeite de oliva' }
      ]
    }
  };

  const proximaRefeicao = refeicoes.cafeManha;
  const mediaGlicemica = 80;
  const progressoGlicemico = 60;

  const diasDoMes = Array.from({ length: 30 }, (_, i) => i + 1);
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#3B5675]">Calendário de Refeições</h1>
          <Button
            onClick={() => navigate('/dieta')}
            className="hover:opacity-90 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: '#CAE5F2',
              color: '#3B5675'
            }}
          >
            Voltar
          </Button>
        </div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Média Glicêmica */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-[#3B5675]">Média Glicêmica</h3>
                <div className="text-3xl font-bold text-[#3B5675]">{mediaGlicemica} mg/dL</div>
                <Progress value={progressoGlicemico} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Refeições */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#3B5675] mb-4">Refeições</h3>
              <div className="space-y-3">
                {Object.values(refeicoes).map((refeicao, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-[#3B5675]" />
                    <span className="text-sm text-gray-700">{refeicao.nome}</span>
                  </div>
                ))}
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-[#3B5675]" />
                  <span className="text-sm text-gray-700">Lanches</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próxima Refeição */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-[#3B5675] mb-4">Próxima Refeição</h3>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-[#3B5675]">{proximaRefeicao.horario}</div>
                <div className="text-sm text-gray-700">{proximaRefeicao.nome}</div>
              </div>
            </CardContent>
          </Card>

          {/* Calendário */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#3B5675] mb-4">Setembro 2025</h3>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="text-xs font-medium text-gray-500 p-1">
                      {dia}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {diasDoMes.map((dia) => (
                    <button
                      key={dia}
                      onClick={() => setDataSelecionada(dia)}
                      className={`w-8 h-8 text-sm rounded-full transition-colors ${
                        dia === dataSelecionada
                          ? 'bg-[#3B5675] text-white'
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {dia}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Plano de Refeições do Dia */}
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-[#3B5675] text-center">
              Plano de Refeições do Dia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.values(refeicoes).map((refeicao, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-[#3B5675]" />
                    <h3 className="text-lg font-semibold text-[#3B5675]">
                      {refeicao.nome} ({refeicao.horario})
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-8">
                    {refeicao.itens.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={item.id}
                          checked={refeicoesConcluidas[item.id]}
                          onCheckedChange={() => handleCheckboxChange(item.id)}
                          className="data-[state=checked]:bg-[#3B5675] data-[state=checked]:border-[#3B5675]"
                        />
                        <label
                          htmlFor={item.id}
                          className={`text-sm cursor-pointer ${
                            refeicoesConcluidas[item.id] 
                              ? 'line-through text-gray-500' 
                              : 'text-gray-700'
                          }`}
                        >
                          {item.nome}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

