import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const { email, protocolo } = await req.json();

    const pdfPath = path.join(
      process.cwd(),
      "public",
      "pdf-condutor",
      "declaracao-condutor.pdf"
    );

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: "Arquivo PDF não encontrado." },
        { status: 404 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
        <div style="max-width: 600px; background: white; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Cabeçalho -->
          <div style="background-color: #0a2a66; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px;">Autarquia Municipal de Trânsito e Transportes</h2>
            <p style="margin: 0; font-size: 14px;">Boletim de Sinistro de Trânsito</p>
          </div>

          <!-- Conteúdo -->
          <div style="padding: 25px; color: #333;">
            <p>Prezado cidadão,</p>

            <p>Informamos que o registro de seu sinistro foi realizado com sucesso em nosso sistema.</p>

            <div style="background-color: #eef3fb; border-left: 4px solid #0a2a66; padding: 10px 15px; margin: 20px 0; border-radius: 5px;">
              <strong>Protocolo do Boletim:</strong>
              <p style="font-size: 18px; color: #0a2a66; margin: 5px 0;"><b>${protocolo}</b></p>
            </div>

            <p>Segue em anexo a <b>Declaração do Condutor</b>, que deverá ser preenchida e encaminhada conforme orientação recebida.</p>

            <p style="margin-top: 20px;">Em caso de dúvidas, entre em contato com a Autarquia Municipal de Trânsito e Transportes.</p>

            <p style="font-size: 14px; color: #666; margin-top: 25px;">
              Atenciosamente,<br/>
              <strong>Autarquia Municipal de Trânsito e Transportes</strong><br/>
              Prefeitura Municipal do Ipojuca
            </p>
          </div>

          <!-- Rodapé -->
          <div style="background-color: #f0f2f5; text-align: center; padding: 15px; font-size: 12px; color: #777;">
            Este e-mail foi enviado automaticamente pelo sistema de boletins de sinistro. Não responda a esta mensagem.
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"Autarquia de Trânsito" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmação de Boletim de Sinistro - Protocolo ${protocolo}`,
      html: htmlTemplate,
      attachments: [
        {
          filename: `Declaracao-${protocolo}.pdf`,
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar e-mail" },
      { status: 500 }
    );
  }
}
