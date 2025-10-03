"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="relative h-1/2 w-full">
        <Image
          src="/guarda-transito.jpg"
          alt="guarda-transito"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-center text-blue-950">
              {isLogin ? "Login" : "Cadastro"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {!isLogin && (
                <>
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" name="name" placeholder="Digite seu nome" />
                </>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>
              <div>
                <Label htmlFor="registration">Matrícula</Label>
                <Input
                  id="registration"
                  name="registration"
                  placeholder="Digite sua matrícula"
                />
              </div>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>

              <Button className="w-full bg-blue-950 hover:bg-blue-900 text-white">
                {isLogin ? "Entrar" : "Cadastrar"}
              </Button>
            </form>
            <p
              className="text-sm text-center text-blue-950 mt-4 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Não tem conta? Cadastre-se"
                : "Já tem conta? Faça login"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
