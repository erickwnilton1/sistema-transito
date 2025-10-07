import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
      asResponse: false,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user: session.user });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao obter usuário" },
      { status: 500 }
    );
  }
}
