import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Acesso não autorizado - não é admin" },
        { status: 403 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, parseInt(searchParams.get("limit") || "10"));
    const skip = (page - 1) * limit;

    const status = searchParams.get("status");
    const searchTerm = searchParams.get("search");

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (searchTerm) {
      where.OR = [
        { protocol: { contains: searchTerm, mode: "insensitive" } },
        { nome: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        { cpf: { contains: searchTerm, mode: "insensitive" } },
        { placa: { contains: searchTerm, mode: "insensitive" } },
      ];
    }

    const total = await prisma.citizenBulletin.count({ where });

    const bulletins = await prisma.citizenBulletin.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        approvedByUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      bulletins,
      totalPages,
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error("Erro ao buscar boletins:", error);
    return NextResponse.json(
      { error: "Erro ao buscar boletins" },
      { status: 500 }
    );
  }
}
