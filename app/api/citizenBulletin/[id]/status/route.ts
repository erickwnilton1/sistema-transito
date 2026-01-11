import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CitizenBulletinStatus } from "@prisma/client";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { status, rejectionReason, approvedBy } = body;

    if (!Object.values(CitizenBulletinStatus).includes(status)) {
      return NextResponse.json({ message: "Status inválido" }, { status: 400 });
    }

    const data: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === "APPROVED") {
      data.approvedAt = new Date();
      data.approvedBy = approvedBy ?? null;
      data.rejectionReason = null;
    }

    if (status === "REJECTED") {
      data.rejectionReason =
        rejectionReason || "Boletim rejeitado pelo analista";
      data.approvedAt = null;
      data.approvedBy = null;
    }

    if (status === "PENDING") {
      data.approvedAt = null;
      data.approvedBy = null;
      data.rejectionReason = null;
    }

    const boletim = await prisma.citizenBulletin.update({
      where: { id },
      data,
    });

    return NextResponse.json(boletim, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);

    return NextResponse.json(
      { message: "Erro interno ao atualizar status" },
      { status: 500 }
    );
  }
}
