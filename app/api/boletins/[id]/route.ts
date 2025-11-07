import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const boletim = await prisma.boletim.findUnique({
      where: { id: Number(id) },
      include: { agent: true },
    });

    if (!boletim)
      return NextResponse.json(
        { error: "Boletim não encontrado" },
        { status: 404 }
      );

    let data = {};
    try {
      data =
        typeof boletim.data === "object"
          ? boletim.data
          : JSON.parse(String(boletim.data || "{}"));
    } catch {
      data = {};
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar boletim" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;

  try {
    const body = await req.json();

    const updated = await prisma.boletim.update({
      where: { id: Number(id) },
      data: {
        data: body,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao atualizar boletim" },
      { status: 500 }
    );
  }
}
