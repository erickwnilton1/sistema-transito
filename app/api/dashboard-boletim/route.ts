import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const boletins = await prisma.boletim.findMany({
      include: { agent: true },
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

      return {
        id: b.id,
        protocolo: b.protocol,
        agente: b.agent?.name,
        data: new Date(b.createdAt).toLocaleDateString("pt-BR"),
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
