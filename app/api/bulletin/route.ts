import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await auth.api.getSession(req);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { ok: false, error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const agenteId = body.agenteId || session.user.id;

    const result = await prisma.$transaction(async (tx) => {
      const created = await tx.boletim.create({
        data: {
          agentId: agenteId,
          data: body.dados,
          observation: body.observacao || null,
          protocol: "",
        },
      });

      const year = new Date().getFullYear();
      const protocol = `BST-${year}-${String(created.id).padStart(6, "0")}`;

      const updated = await tx.boletim.update({
        where: { id: created.id },
        data: { protocol: protocol },
      });

      return updated;
    });

    return NextResponse.json({
      ok: true,
      protocolo: result.protocol,
      id: result.id,
    });
  } catch (err: any) {
    console.error("Erro ao criar boletim:", err);
    return NextResponse.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
