import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return;
    // Salva os dados temporariamente e vai para seleção de plano
    navigate("/plans", { 
      state: { 
        userData: { name, email, password } 
      } 
    });
  }

  return (
    <div className="min-h-screen bg-medical-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-[#3B5675]">Bem-vindo</CardTitle>
          <CardDescription className="text-[#3B5675]">Faça seu login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Seu nome</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white text-[#3B5675] placeholder-[#3B5675]/60 border-2 border-[#3B5675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B5675] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-[#3B5675] placeholder-[#3B5675]/60 border-2 border-[#3B5675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B5675] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Defina uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white text-[#3B5675] placeholder-[#3B5675]/60 border-2 border-[#3B5675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3B5675] focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-8 py-3 hover:opacity-90 text-white font-semibold rounded-lg shadow transition-all duration-200 hover:shadow-md"
                style={{
                  background: "linear-gradient(135deg, #3B5675 0%, #CAE5F2 100%)",
                }}
              >
                Fazer Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


