import { useState, useEffect } from 'react';
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
    { time: 'agora', accuracy: 97 },
    { time: 'daqui 5min', accuracy: 88 },
    { time: 'daqui 15min', accuracy: 84 },
    { time: 'daqui 30min', accuracy: 79 },
    { time: 'daqui 1h', accuracy: 75 }
  ];

  const glucoseStatus = getGlucoseStatus(currentGlucose);

  return (
    <div className="min-h-screen bg-medical-bg p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-medical bg-clip-text text-transparent">
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
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Glicose Atual</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary">{currentGlucose}</span>
                  <span className="text-xl text-muted-foreground">mg/dL</span>
                </div>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${glucoseStatus.bgColor} ${glucoseStatus.color}`}>
                  {glucoseStatus.status}
                </div>
              </div>
              <div className="text-right space-y-2">
                <Button 
                  onClick={measureGlucose}
                  className="bg-gradient-medical hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <Activity className="mr-2 h-4 w-4" />
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
                <LineChart data={readings}>
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
                  <ReferenceLine y={180} stroke="hsl(var(--glucose-warning))" strokeDasharray="5 5" label="Hiperglicemia" />
                  <ReferenceLine y={70} stroke="hsl(var(--glucose-danger))" strokeDasharray="5 5" label="Hipoglicemia" />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                    <span>Faixa Normal (70-180 mg/dL)</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span>Hiperglicemia (&gt; 180 mg/dL)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-danger"></div>
                    <span>Hipoglicemia (&lt; 70 mg/dL)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prediction Chart */}
          <Card className="bg-gradient-card shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                Precisão de Predição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis domain={[60, 100]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value}%`, 'Precisão']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">97%</div>
                  <div className="text-sm text-muted-foreground">agora</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">75%</div>
                  <div className="text-sm text-muted-foreground">daqui 1h</div>
                </div>
              </div>
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
                  <p className="text-3xl font-bold text-primary">{calculateAverage()}</p>
                  <p className="text-sm text-muted-foreground">mg/dL</p>
                </div>
                <Activity className="h-8 w-8 text-primary opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tempo no Alvo</p>
                  <p className="text-3xl font-bold text-accent">{calculateTimeInRange()}%</p>
                  <p className="text-sm text-muted-foreground">das leituras</p>
                </div>
                <Target className="h-8 w-8 text-accent opacity-60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Próxima Medição</p>
                  <p className="text-3xl font-bold text-warning">5</p>
                  <p className="text-sm text-muted-foreground">min</p>
                </div>
                <Clock className="h-8 w-8 text-warning opacity-60" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GlucoseMonitor;