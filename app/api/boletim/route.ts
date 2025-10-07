import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

//Search Bulletin
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
      asResponse: false,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const boletins = await prisma.boletim.findMany({
      where: { agentId: userId },
      orderBy: { createdAt: "desc" },
    });

    const mappedBoletins = boletins.map((b) => ({
      id: b.id,
      protocolo: b.protocol,
      createdAt: b.createdAt.toISOString(),
      ...(typeof b.data === "object" && b.data !== null ? b.data : {}),
    }));

    return NextResponse.json(mappedBoletins);
  } catch (err) {
    console.error("Erro ao buscar boletins:", err);
    return NextResponse.json(
      { error: "Erro ao buscar boletins" },
      { status: 500 }
    );
  }
}

// Add protocol
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
      asResponse: false,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { error: "Dados obrigatórios" },
        { status: 400 }
      );
    }

    const { agentId, ...boletimData } = data;

    if (!agentId) {
      return NextResponse.json(
        { error: "ID do agente é obrigatório" },
        { status: 400 }
      );
    }

    const hoje = new Date();

    const dateStr = hoje.toISOString().slice(0, 10).replace(/-/g, "");

    const countToday = await prisma.boletim.count({
      where: {
        createdAt: {
          gte: new Date(hoje.setHours(0, 0, 0, 0)),
          lt: new Date(hoje.setHours(23, 59, 59, 999)),
        },
      },
    });

    const protocolo = `${dateStr}-${(countToday + 1).toString().padStart(4, "0")}`;

    const boletim = await prisma.boletim.create({
      data: {
        protocol: protocolo,
        data: boletimData,
        agentId,
      },
    });

    return NextResponse.json({ success: true, protocol: boletim.protocol });
  } catch (err) {
    console.error("Erro ao salvar boletim:", err);
    return NextResponse.json(
      { error: "Erro ao salvar boletim" },
      { status: 500 }
    );
  }
}
