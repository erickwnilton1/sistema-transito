import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do boletim não informado" },
        { status: 400 }
      );
    }

    const boletim = await prisma.citizenBulletin.findUnique({
      where: { id },
    });

    if (!boletim) {
      return NextResponse.json(
        { message: "Boletim não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(boletim, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar boletim:", error);

    return NextResponse.json(
      { message: "Erro interno ao buscar boletim" },
      { status: 500 }
    );
  }
}
