import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { registration } = await req.json();

    if (!registration) {
      return NextResponse.json({ exists: false });
    }

    const user = await prisma.user.findUnique({
      where: { registration },
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error("Erro ao verificar usuário:", error);
    return NextResponse.json(
      { exists: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
