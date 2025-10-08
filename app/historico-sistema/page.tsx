import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import HistoricoClient from "./client";

export default async function HistoricoPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user) {
    redirect("/acesso-negado");
  }

  return <HistoricoClient />;
}
