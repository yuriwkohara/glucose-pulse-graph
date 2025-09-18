import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DietaPersonalizada() {
  const [dietaGerada, setDietaGerada] = useState(false);

  const handleGerarDieta = () => {
    setDietaGerada(true);
  };

  const diasDaSemana = [
    "SEGUNDA",
    "TERÇA", 
    "QUARTA",
    "QUINTA",
    "SEXTA",
    "SÁBADO",
    "DOMINGO"
  ];

  const dietaSemanal = {
    SEGUNDA: [
      "Café da manhã: kefir (300 ml), amaranto em flocos (15 g), abacate (70 g), banana verde cozida (60 g), chia (5 g)",
      "Lanche da manhã: clara de ovo (120 g), granola sem açúcar e sementes (45 g), figo fresco (100 g)",
      "Almoço: bacalhau dessalgado (120 g), batata-doce (240 g), abóbora cabotia (120 g), salada verde (150 g), cevada cozida (porção), azeite de oliva (1.25 c.s.)",
      "Lanche da tarde: homus (75 g), pão de espelta integral (20 g), morango (200 g)",
      "Jantar: peixe assado (120 g), batata-doce (210 g), abobrinha (120 g), abacate (70 g), espinafre (porção), milho verde (porção)"
    ],
    TERÇA: [
      "Café da manhã: kefir (300 ml), aveia (22.5 g), banana verde cozida (80 g), morango (100 g), nozes (7.5 g)",
      "Lanche da manhã: iogurte (150 g), pão integral 100% (60 g), ameixa fresca (100 g)",
      "Almoço: frango grelhado (120 g), batata-doce (120 g), alcachofra (100 g), pepino (100 g), espaguete integral (80 g), coco em lascas (15 g)",
      "Lanche da tarde: leite vegetal (400 ml), torrada integral (40 g), framboesa (160 g)",
      "Jantar: camarão (120 g), batata-doce (120 g), alface (70 g), abacate (70 g), salada completa (200 g), arroz integral (80 g)"
    ],
    QUARTA: [
      "Café da manhã: kefir (150 ml), centeio 100% (120 g), banana verde cozida (80 g), morango (100 g), chia (10 g)",
      "Lanche da manhã: ovo (2 un), granola sem açúcar e sementes (90 g), amora (100 g)",
      "Almoço: ovo cozido (2 un), arroz negro (140 g), alface roxa (70 g), alcachofra (100 g), arroz integral (120 g), mix de sementes (10 g)",
      "Lanche da tarde: proteína em pó sem açúcar (25 g), pão de espelta integral (120 g), damasco fresco (100 g)",
      "Jantar: lentilhas (80 g), arroz vermelho (92 g), almeirão (60 g), espinafre (porção), cevada cozida (porção), semente de girassol (15 g)"
    ],
    QUINTA: [
      "Café da manhã: kefir (150 ml), creme de aveia com frutas vermelhas (600 g), cuscuz integral de milho (80 g), laranja-bahia (130 g), nozes (15 g)",
      "Lanche da manhã: queijo cottage sem sal (80 g), pão integral 100% (120 g), morango (100 g)",
      "Almoço: frango grelhado (150 g), mandioca cozida (porção), aspargo (100 g), alcachofra (100 g), arroz integral (211.6 g), sementes de abóbora (20 g)",
      "Lanche da tarde: whey protein sem sabor (25 g), torrada integral (60 g), amêndoas (15 g)",
      "Jantar: grão-de-bico (160 g), brócolis (120 g), espinafre (porção), cevada cozida (porção), tahine (7.5 g), azeite de oliva (0.75 c.s.)"
    ],
    SEXTA: [
      "Café da manhã: kefir (150 ml), farinha de grão-de-bico em panquecas (200 g), aveia (60 g), kiwi (100 g), chia (15 g)",
      "Lanche da manhã: clara de ovo (120 g), granola sem açúcar e sementes (30 g), morango (100 g)",
      "Almoço: ovo cozido (2 un), painço cozido (200 g), berinjela (120 g), alcachofra (100 g), cevada cozida (porção), coco em lascas (15 g)",
      "Lanche da tarde: homus (105 g), pão de espelta integral (80 g), goiaba (200 g)",
      "Jantar: carne magra (150 g), polenta integral (porção), broto de alfafa (40 g), alcachofra (100 g), milho verde (porção), mix de sementes (20 g)"
    ],
    SÁBADO: [
      "Café da manhã: kefir (150 ml), panqueca integral de banana verde (360 g), creme de aveia com frutas vermelhas (200 g), amora (100 g), nozes (15 g)",
      "Lanche da manhã: iogurte (150 g), pão integral 100% (120 g), framboesa (80 g)",
      "Almoço: frango grelhado (150 g), quinoa (240 g), cebolinha (10 g), alcachofra (100 g), salada completa (200 g), arroz integral (211.6 g)",
      "Lanche da tarde: leite vegetal (200 ml), torrada integral (60 g), framboesa (80 g)",
      "Jantar: filé mignon (120 g), sorgo cozido (porção), chuchu (120 g), alcachofra (100 g), cevada cozida (porção), semente de girassol (12.5 g)"
    ],
    DOMINGO: [
      "Café da manhã: kefir (150 ml), quinoa em flocos (30 g), chia (10 g), aveia (22.5 g), morango (100 g)",
      "Lanche da manhã: ovo (2 un), granola sem açúcar e sementes (90 g), maçã com casca (120 g)",
      "Almoço: peixe assado (90 g), trigo sarraceno cozido (175 g), cogumelos (120 g), alcachofra (100 g), arroz integral (140 g), sementes de abóbora (15 g)",
      "Lanche da tarde: proteína em pó sem açúcar (25 g), pão de espelta integral (40 g), melão cantaloupe (150 g)",
      "Jantar: lagarto cozido (120 g), arroz negro (140 g), couve manteiga (porção), alcachofra (100 g), cevada cozida (porção), tahine (20 g)"
    ]
  };

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#3B5675]">
            Dieta Personalizada
          </h1>
          <p className="text-muted-foreground">
            Análise e geração expecífica dos seus dados
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="bg-white/70 backdrop-blur-sm max-w-2xl w-full">
            <CardHeader>
              <CardTitle className="text-[#3B5675]">Geração de Plano</CardTitle>
              <CardDescription>
                Clique no botão abaixo para gerar sua dieta personalizada com base nas suas preferências e objetivos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Button size="lg" onClick={handleGerarDieta}>Gerar Dieta</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {dietaGerada && (
          <div className="mt-8">
            <Card className="bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#3B5675] text-center">
                  Com base nas suas características foi gerada a seguinte dieta:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {diasDaSemana.map((dia, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="text-xl font-bold text-[#3B5675] hover:no-underline hover:text-[#3B5675] py-4">
                        {dia}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2">
                          {dietaSemanal[dia as keyof typeof dietaSemanal].map((refeicao, refeicaoIndex) => (
                            <div key={refeicaoIndex} className="text-sm text-muted-foreground">
                              • {refeicao}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-[#3B5675] mb-3">Dicas adicionais:</h4>
                  <p className="text-sm text-muted-foreground">
                    Priorizar fibras: chia, linhaça, vegetais crus; Evitar farinhas refinadas e açúcares simples
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
