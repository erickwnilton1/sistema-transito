import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, protocol } = await req.json();

    if (!email || !protocol) {
      return NextResponse.json(
        { error: "Protocolo e email são obrigatórios." },
        { status: 400 }
      );
    }

    const boletim = await prisma.boletim.findUnique({
      where: { protocol },
    });

    if (!boletim) {
      return NextResponse.json(
        { error: "Boletim não encontrado." },
        { status: 404 }
      );
    }

    const data =
      typeof boletim.data === "object"
        ? boletim.data
        : JSON.parse(String(boletim.data || "{}"));

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
        <div style="max-width: 650px; background: white; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <div style="background-color: #0a2a66; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px;">Comprovante do Boletim de Sinistro</h1>
            <p style="margin: 0; font-size: 14px;">Autarquia Municipal de Trânsito e Transportes</p>
          </div>

          <div style="padding: 25px; color: #333;">
            <p>Prezado cidadão,</p>

            <p>Segue abaixo o comprovante referente ao seu boletim registrado.</p>

            <div style="background-color: #eef3fb; border-left: 4px solid #0a2a66; padding: 12px 18px; margin: 20px 0; border-radius: 5px;">
              <strong>Protocolo:</strong>
              <p style="font-size: 20px; color: #0a2a66; margin: 5px 0;"><b>${boletim.protocol}</b></p>
            </div>

            <h3 style="margin-top: 25px;">Informações Gerais</h3>
            <pre style="
              background-color: #f7f9fc;
              padding: 15px;
              border-radius: 8px;
              overflow-x: auto;
              border: 1px solid #e1e4e8;
            ">${JSON.stringify(data, null, 2)}</pre>

            <p style="margin-top: 20px;">Data de criação: <b>${new Date(
              boletim.createdAt
            ).toLocaleString("pt-BR")}</b></p>

            <p style="font-size: 14px; color: #666; margin-top: 25px;">
              Atenciosamente,<br/>
              <strong>Autarquia Municipal de Trânsito e Transportes</strong>
            </p>
          </div>

          <div style="background-color: #f0f2f5; text-align: center; padding: 12px; font-size: 12px; color: #777;">
            Este é um e-mail automático. Não responda.
          </div>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Autarquia de Trânsito" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Comprovante - Protocolo ${protocol}`,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar comprovante:", error);
    return NextResponse.json(
      { error: "Erro ao enviar comprovante" },
      { status: 500 }
    );
  }
}
