import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import OrientacaoClient from "./client";

export default async function SuportePage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user) {
    redirect("/acesso-negado");
  }

  return <OrientacaoClient />;
}
