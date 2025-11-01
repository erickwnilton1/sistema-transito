import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalBoletins = await prisma.boletim.count();

    const totalAgentes = await prisma.user.count({
      where: { role: "AGENT" },
    });

    const boletinsMes = await prisma.boletim.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
      },
    });

    return NextResponse.json({
      boletins: totalBoletins,
      agentes: totalAgentes,
      boletinsMes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados do dashboard" },
      { status: 500 }
    );
  }
}
