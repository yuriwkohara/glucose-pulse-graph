import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { Activity, Clock, Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

interface GlucoseReading {
  id: number;
  value: number;
  timestamp: Date;
  time: string;
}

const GlucoseMonitor = () => {
  const [currentGlucose, setCurrentGlucose] = useState<number>(125);
  const navigate = useNavigate();
  const [readings, setReadings] = useState<GlucoseReading[]>([
    { id: 1, value: 142, timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), time: '4h atrás' },
    { id: 2, value: 138, timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), time: '3h atrás' },
    { id: 3, value: 155, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), time: '2h atrás' },
    { id: 4, value: 143, timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), time: '1h atrás' },
    { id: 5, value: 125, timestamp: new Date(), time: 'agora' }
  ]);
  const [lastMeasurement, setLastMeasurement] = useState<Date>(new Date());

  const measureGlucose = () => {
    // Gera um valor realista de glicose (80-200 mg/dL)
    const newValue = Math.floor(Math.random() * 120) + 80;
    const newTimestamp = new Date();
    const newReading: GlucoseReading = {
      id: Date.now(),
      value: newValue,
      timestamp: newTimestamp,
      time: 'agora'
    };

    setCurrentGlucose(newValue);
    setLastMeasurement(newTimestamp);
    
    // Atualiza as leituras, mantendo apenas as últimas 5
    setReadings(prev => {
      const updated = [...prev.slice(1), newReading];
      // Atualiza os tempos relativos
      return updated.map((reading, index) => ({
        ...reading,
        time: index === updated.length - 1 ? 'agora' : `${updated.length - index}h atrás`
      }));
    });
  };

  const getGlucoseStatus = (value: number) => {
    if (value < 70) return { status: 'Hipoglicemia', color: 'text-danger', bgColor: 'bg-danger/10' };
    if (value > 180) return { status: 'Hiperglicemia', color: 'text-danger', bgColor: 'bg-danger/10' };
    if (value > 140) return { status: 'Elevada', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'Normal', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const calculateAverage = () => {
    return Math.round(readings.reduce((sum, reading) => sum + reading.value, 0) / readings.length);
  };

  const calculateTimeInRange = () => {
    const inRange = readings.filter(reading => reading.value >= 70 && reading.value <= 180).length;
    return Math.round((inRange / readings.length) * 100);
  };

  const hasHighRiskReadings = () => {
    return readings.some(reading => reading.value < 70 || reading.value > 200);
  };

  const predictionData = [
    { time: 'agora', glucose: currentGlucose },
    { time: '5min', glucose: Math.round(currentGlucose + (Math.random() - 0.5) * 20) },
    { time: '15min', glucose: Math.round(currentGlucose + (Math.random() - 0.5) * 30) },
    { time: '30min', glucose: Math.round(currentGlucose + (Math.random() - 0.5) * 40) },
    { time: '45min', glucose: Math.round(currentGlucose + (Math.random() - 0.5) * 50) },
    { time: '1h', glucose: Math.round(currentGlucose + (Math.random() - 0.5) * 60) }
  ];

  // Helper de risco
  const isRiskValue = (v: number) => v >= 180 || v <= 70 || (v > 170 && v < 180) || (v >= 70 && v < 80);
  // Série apenas para destacar os trechos de risco (sobreposição)
  const predictionRiskOverlay = predictionData.map(p => ({ time: p.time, glucose: isRiskValue(p.glucose) ? p.glucose : null }));

  // Detecção de risco para a previsão (hipo/hiper ou proximidade de 10 mg/dL)
  const hyperOut = predictionData.some(p => p.glucose >= 180);
  const hypoOut = predictionData.some(p => p.glucose <= 70);
  const hyperNear = predictionData.some(p => p.glucose > 170 && p.glucose < 180);
  const hypoNear = predictionData.some(p => p.glucose >= 70 && p.glucose < 80);
  const hasAnyWarning = hyperOut || hypoOut || hyperNear || hypoNear;

  const warningMessage = (() => {
    if (hyperOut && hypoOut) return 'Alerta: previsão em zonas de hipo e hiperglicemia.';
    if (hyperOut) return 'Alerta: previsão em zona de hiperglicemia.';
    if (hypoOut) return 'Alerta: previsão em zona de hipoglicemia.';
    if (hyperNear && hypoNear) return 'Atenção: previsão próxima das zonas de hipo e hiperglicemia.';
    if (hyperNear) return 'Atenção: previsão próxima da zona de hiperglicemia.';
    if (hypoNear) return 'Atenção: previsão próxima da zona de hipoglicemia.';
    return '';
  })();

  const glucoseStatus = getGlucoseStatus(currentGlucose);
  // Texto curto para aviso inline ao lado do status atual
  const inlineWarningText = hyperOut
    ? 'Risco de Hipercglicemia'
    : hypoOut
    ? 'Risco de Hiperglicemia'
    : 'Previsão em risco';

  // Dot único com cor condicional
  const RiskAwareDot = (props: any) => {
    const { cx, cy, payload } = props;
    const v = payload?.glucose as number | undefined;
    if (v == null) return null;
    const risk = isRiskValue(v);
    const color = risk ? '#3B5675' : '#CAE5F2';
    return <circle cx={cx} cy={cy} r={5} fill={color} stroke={color} strokeWidth={2} />;
  };

  // Tooltip customizado para mostrar um único valor por ponto
  const GlucosePredictionTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;
    const areaEntry = payload.find((e: any) => e.dataKey === 'glucose') || payload[0];
    const dataPoint = areaEntry?.payload;
    const value = dataPoint?.glucose ?? dataPoint?.normalGlucose ?? dataPoint?.riskGlucose;
    if (value == null) return null;
    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        padding: '6px 10px'
      }}>
        <div style={{ fontWeight: 600, color: '#3B5675' }}>{value} mg/dL</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#3B5675]">
            Monitor de Glicose
          </h1>
          <p className="text-muted-foreground">
            Acompanhamento em tempo real dos níveis glicêmicos
          </p>
        </div>

        {/* Current Glucose Card */}
        <Card className="bg-gradient-card shadow-lg border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#3B5675]" />
                  <span className="text-sm font-medium text-muted-foreground">Glicose Atual</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-[#3B5675]">{currentGlucose}</span>
                    <span className="text-xl text-muted-foreground">mg/dL</span>
                  </div>
                  <div className={`inline-flex px-4 py-2 rounded-full text-base font-semibold ${glucoseStatus.bgColor} ${glucoseStatus.color}`}>
                    {glucoseStatus.status}
                  </div>
                  {hasAnyWarning && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{inlineWarningText}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right space-y-2">
                <Button 
                  onClick={measureGlucose}
                  className="hover:opacity-90 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                  style={{
                    backgroundColor: '#CAE5F2',
                    color: '#3B5675'
                  }}
                >
                  <Activity className="mr-2 h-4 w-4" style={{ color: '#3B5675' }} />
                  Medir Glicose
                </Button>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Última atualização: agora
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {hasHighRiskReadings() && (
          <Alert className="border-danger/20 bg-danger/5">
            <AlertTriangle className="h-4 w-4 text-danger" />
            <AlertDescription className="text-danger font-medium">
              Detectadas medições em zona de risco nas últimas leituras
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Glucose Trend Chart */}
          <Card className="bg-gradient-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Tendência de Glicose (Últimas 5 Medições)
                {readings.some(r => r.value > 180 || r.value < 70) && (
                  <AlertTriangle className="h-4 w-4 text-warning ml-auto" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={readings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis domain={[60, 220]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <ReferenceLine y={180} stroke="#3B5675" strokeDasharray="5 5" label="Hiperglicemia" />
                  <ReferenceLine y={70} stroke="#3B5675" strokeDasharray="5 5" label="Hipoglicemia" />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B5675" 
                    fill="rgba(59, 86, 117, 0.2)"
                    strokeWidth={3}
                    dot={{ fill: '#3B5675', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3B5675', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p>Faixa Normal (70-180 mg/dL)</p>
                <p>Hiperglicemia (&gt; 180 mg/dL)</p>
                <p>Hipoglicemia (&lt; 70 mg/dL)</p>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Chart */}
          <Card className="bg-gradient-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#CAE5F2]" />
                Previsão de Glicose
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis domain={[60, 220]} stroke="#64748b" />
                  <Tooltip content={<GlucosePredictionTooltip />} />
                  <ReferenceLine y={180} stroke="#3B5675" strokeDasharray="5 5" label="Hiperglicemia" />
                  <ReferenceLine y={70} stroke="#3B5675" strokeDasharray="5 5" label="Hipoglicemia" />
                  {/* Linha/área base contínua */}
                  <Area 
                    type="linear" 
                    dataKey="glucose" 
                    stroke="#CAE5F2" 
                    fill="rgba(202, 229, 242, 0.35)"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    dot={<RiskAwareDot />}
                    activeDot={<RiskAwareDot />}
                  />
                  {/* Sobreposição apenas nos trechos de risco (mesma linha, sem criar nova série visual) */}
                  <Line
                    type="linear"
                    data={predictionRiskOverlay as any}
                    dataKey="glucose"
                    stroke="#3B5675"
                    strokeWidth={3}
                    dot={false}
                    activeDot={false}
                    connectNulls={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {hasAnyWarning && (
                <div className="mt-3 text-center">
                  <span className="text-sm font-semibold" style={{ color: '#3B5675' }}>{warningMessage}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Média Últimas 24h</p>
                  <p className="text-3xl font-bold text-[#3B5675]">{calculateAverage()}</p>
                  <p className="text-sm text-muted-foreground">mg/dL</p>
                </div>
                <Activity className="h-8 w-8 text-[#3B5675] opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tempo no Alvo</p>
                  <p className="text-3xl font-bold text-[#3B5675]">{calculateTimeInRange()}%</p>
                  <p className="text-sm text-muted-foreground">das leituras</p>
                </div>
                <Target className="h-8 w-8 text-[#3B5675] opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Precisão nas Previsões</p>
                  <p className="text-3xl font-bold text-[#CAE5F2]">95</p>
                  <p className="text-sm text-muted-foreground">%</p>
                </div>
                <Clock className="h-8 w-8 text-[#CAE5F2] opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Voltar ao menu */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/')}
            className="hover:opacity-90 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
            style={{
              backgroundColor: '#CAE5F2',
              color: '#3B5675'
            }}
          >
            Retornar ao menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlucoseMonitor;