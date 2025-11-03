import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const boletins = await prisma.boletim.findMany({
      include: { agent: true }, // Inclui o nome do agente
      orderBy: { createdAt: "desc" },
    });

    const data = boletins.map((b) => {
      let info: any = {};

      try {
        info =
          typeof b.data === "object"
            ? b.data
            : JSON.parse(String(b.data || "{}"));
      } catch {
        info = {};
      }

      const rua = info.rua || "";
      const bairro = info.bairro ? ` - ${info.bairro}` : "";
      const referencia = info.pontoReferencia
        ? ` (${info.pontoReferencia})`
        : "";

      const local =
        rua || bairro || referencia
          ? `${rua}${bairro}${referencia}`
          : "Não informado";

      return {
        id: b.id,
        protocolo: b.protocol,
        agente: b.agent?.name,
        agentId: b.agent?.id,
        data: new Date(b.createdAt).toLocaleDateString("pt-BR"),
        local,
        tipo: info.tipoAcidente,
        status: "Registrado",
      };
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar boletins" },
      { status: 500 }
    );
  }
}
