import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const agentes = await prisma.user.findMany({
      where: { role: "AGENT" },
      select: {
        id: true,
        name: true,
        email: true,
        registration: true,
        role: true,
      },
      orderBy: { name: "asc" },
    });
    return NextResponse.json(agentes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar agentes" },
      { status: 500 }
    );
  }
}
