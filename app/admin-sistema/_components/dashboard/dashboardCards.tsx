"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar } from "lucide-react";

export function DashboardCards() {
  const [stats, setStats] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div className="text-gray-500">Carregando dados...</div>;
  if (!stats)
    return <div className="text-red-500">Erro ao carregar dados.</div>;

  const cards = [
    {
      title: "Boletins Registrados",
      value: stats.boletins,
      icon: FileText,
      color: "text-blue-400",
    },
    {
      title: "Agentes Ativos",
      value: stats.agentes,
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Boletins no Mês",
      value: stats.boletinsMes,
      icon: Calendar,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cards.map((stat) => (
        <Card
          key={stat.title}
          className="bg-gray-100 shadow-md hover:bg-gray-200 transition flex flex-col"
        >
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-950">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
