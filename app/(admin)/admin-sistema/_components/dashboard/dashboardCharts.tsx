"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function useIsTabletOrLarger() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsTablet(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return isTablet;
}

type BoletimRaw = {
  id: number;
  tipo?: string;
  status?: string;
  agentId?: string | number;
  agente?: string;
  local?: string;
};

type AgenteRaw = { id: string | number; name: string };

const COLORS = [
  "#05e556",
  "#ffcc00",
  "#e80c0c",
  "#0072ff",
  "#004a92",
  "#fd6500",
];

export function DashboardCharts() {
  const [boletins, setBoletins] = useState<BoletimRaw[]>([]);
  const [agentes, setAgentes] = useState<AgenteRaw[]>([]);
  const [loading, setLoading] = useState(false);
  const isTablet = useIsTabletOrLarger();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [bRes, aRes] = await Promise.all([
        axios.get<BoletimRaw[]>("/api/dashboard-boletim"),
        axios.get<AgenteRaw[]>("/api/agentes"),
      ]);
      setBoletins(bRes.data || []);
      setAgentes(aRes.data || []);
    } catch (err) {
      console.error("Erro ao carregar dados do dashboard:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <p className="text-center text-gray-500">Carregando gráficos...</p>;

  const boletinsTipoMap: Record<string, number> = {};
  boletins.forEach((b) => {
    const key = b.tipo ?? "Não informado";
    boletinsTipoMap[key] = (boletinsTipoMap[key] || 0) + 1;
  });

  const boletinsTipoData = Object.entries(boletinsTipoMap).map(
    ([tipo, Quantidade]) => ({ tipo, Quantidade })
  );

  const agentesBoletinsData = agentes.map((a) => {
    const count = boletins.filter((b) => {
      if (b.agentId !== undefined && b.agentId !== null)
        return String(b.agentId) === String(a.id);
      if (b.agente !== undefined && b.agente !== null)
        return String(b.agente).trim() === String(a.name).trim();
      return false;
    }).length;
    return { name: a.name, Boletins: count };
  });

  const agentesBoletinsDataFiltered = agentesBoletinsData.filter(
    (a) => a.Boletins > 0
  );

  const lugaresMap: Record<string, number> = {};

  boletins.forEach((b) => {
    const local = b.local ?? "Não informado";
    lugaresMap[local] = (lugaresMap[local] || 0) + 1;
  });

  const lugaresData = Object.entries(lugaresMap)
    .map(([local, Quantidade], index) => ({
      local: `${index + 1}. ${local}`,
      Quantidade,
    }))
    .sort((a, b) => b.Quantidade - a.Quantidade)
    .slice(0, 10);

  return (
    <AnimatePresence mode="wait">
      {!isTablet ? (
        <motion.p
          key="msg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-gray-500 text-sm"
        >
          📊 Gráficos disponíveis apenas em telas maiores.
        </motion.p>
      ) : (
        <motion.div
          key="charts"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid lg:grid-cols-2 gap-5"
        >
          <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Distribuição de Acidentes por Tipo
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Exibe a quantidade de boletins por tipo de acidente.
              </p>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={boletinsTipoData as any[]}
                  margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="tipo" tick={{ fill: "#334155" }} />
                  <YAxis tick={{ fill: "#334155" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Quantidade" radius={[10, 10, 0, 0]}>
                    {boletinsTipoData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-white border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Agentes — Boletins Criados
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Exibe todos os agentes com boletins registrados.
              </p>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={agentesBoletinsDataFiltered as any[]}
                  margin={{ top: 16, right: 16, left: 0, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fill: "#334155" }} />
                  <YAxis tick={{ fill: "#334155" }} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="Boletins"
                    fill="#004a92"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 bg-gray-50 border border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Vias com mais acidentes
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Exibe as 10 vias com mais registros de acidentes.
              </p>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={lugaresData as any[]}
                  margin={{ top: 16, right: 16, left: 80, bottom: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" tick={{ fill: "#334155" }} />
                  <YAxis
                    type="category"
                    dataKey="local"
                    tick={{ fill: "#334155" }}
                    width={250}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Quantidade">
                    {lugaresData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
