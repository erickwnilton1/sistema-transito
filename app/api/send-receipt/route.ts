import { NextResponse } from "next/server";
import ejs from "ejs";
import path from "path";
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

    const templatePath = path.join(
      process.cwd(),
      "app",
      "templates",
      "receipt.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      protocol: boletim.protocol,
      data,
      createdAt: boletim.createdAt,
    });

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
      subject: `Comprovante do Protocolo ${protocol}`,
      html,
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
