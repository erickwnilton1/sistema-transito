import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const boletins = await prisma.citizenBulletin.findMany({
      where: {
        status: "APPROVED",
      },
      select: {
        id: true,
        protocol: true,
        nome: true,
        placa: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(boletins, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar boletins aprovados:", error);

    return NextResponse.json(
      { message: "Erro ao buscar boletins aprovados" },
      { status: 500 }
    );
  }
}
