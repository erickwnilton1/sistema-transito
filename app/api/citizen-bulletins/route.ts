import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      nome,
      email,
      cpf,
      telefone,
      placa,
      renavam,
      endereco,
      data,
      hora,
      outroCondutor,
      outroVeiculo,
      testemunhas,
      relato,
      imagemUrl,
    } = body;

    if (
      !nome ||
      !email ||
      !cpf ||
      !telefone ||
      !placa ||
      !renavam ||
      !endereco ||
      !data ||
      !hora ||
      !relato ||
      !imagemUrl
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      );
    }

    const dataFormatada = new Date(data);

    const citizenBulletin = await prisma.citizenBulletin.create({
      data: {
        nome,
        email,
        cpf,
        telefone,
        placa,
        renavam,
        endereco,
        data: dataFormatada,
        hora,
        outroCondutor: outroCondutor ? JSON.stringify(outroCondutor) : null,
        outroVeiculo: outroVeiculo ? JSON.stringify(outroVeiculo) : null,
        testemunhas: JSON.stringify(testemunhas),
        relato,
        imageUrl: imagemUrl,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "Boletim registrado com sucesso",
        id: citizenBulletin.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar boletim:", error);
    return NextResponse.json(
      { error: "Erro ao registrar boletim" },
      { status: 500 }
    );
  }
}
