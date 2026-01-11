import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateProtocol } from "@/lib/generateProtocol";
import nodemailer from "nodemailer";

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

    const protocol = generateProtocol();
    const dataFormatada = new Date(data);

    const citizenBulletin = await prisma.citizenBulletin.create({
      data: {
        protocol,
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
        testemunhas: JSON.stringify(testemunhas || []),
        relato,
        imageUrl: imagemUrl,
        status: "PENDING",
      },
    });

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
        <div style="max-width: 650px; background: white; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <div style="background-color: #0a2a66; color: white; padding: 20px; text-align: center;">
             <h1 style="margin: 0; font-size: 22px;">Boletim registrado com sucesso</h1>
             <p style="margin: 0; font-size: 14px;">Autarquia Municipal de Trânsito</p>
          </div>

        <div style="padding: 25px; color: #333;">
            <p>Olá <b>${nome}</b>,</p>

          <p>
            Informamos que seu <b>boletim de ocorrência de trânsito</b> foi registrado com sucesso
            em nosso sistema.
          </p>

        <div style="background-color: #eef3fb; border-left: 4px solid #0a2a66; padding: 12px 18px; margin: 20px 0; border-radius: 5px;">
          <strong>Número do protocolo:</strong>
          <p style="font-size: 20px; color: #0a2a66; margin: 5px 0;">
            <b>${protocol}</b>
          </p>
        </div>

        <p>
          Seu registro passará por uma <b>análise</b>. Após a aprovação do boletim,
          com o prazo de <b>até 5 dias úteis</b>, você poderá consultar a situação do seu boletim
          seguindo os passos abaixo:
        </p>

        <h3 style="margin-top: 25px;">📌 Como consultar seu boletim</h3>

        <ol style="padding-left: 18px; line-height: 1.6;">
          <li>Acesse o portal da Autarquia Municipal de Trânsito;</li>
          <li>Clique na opção <b>"Consultar Boletim"</b>;</li>
          <li>Informe o <b>número do protocolo</b> recebido neste e-mail;</li>
          <li>Acompanhe o status e as informações do seu registro.</li>
        </ol>

        <p>
          Guarde este número de protocolo, pois ele é essencial para qualquer consulta ou
          atendimento futuro.
        </p>

        <p style="font-size: 14px; color: #666; margin-top: 25px;">
          Atenciosamente,<br/>
          <strong>Autarquia Municipal de Trânsito</strong>
        </p>
      </div>

      <div style="background-color: #f0f2f5; text-align: center; padding: 12px; font-size: 12px; color: #777;">
        Este é um e-mail automático. Não responda.
      </div>
      </div>
    </div>
    `;
      await transporter.sendMail({
        from: `"Autarquia de Trânsito" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Boletim registrado - Protocolo ${protocol}`,
        html: htmlTemplate,
      });
    } catch (emailError) {
      console.error("Erro ao enviar e-mail:", emailError);
    }

    return NextResponse.json(
      {
        message: "Boletim registrado com sucesso",
        protocol: citizenBulletin.protocol,
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
