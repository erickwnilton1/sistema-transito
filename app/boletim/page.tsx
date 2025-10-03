import { auth } from "@/lib/auth";
import LogoutButton from "../_components/logout-button-app";

export default async function BoletimPage() {
  const session = await auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session?.user) {
    return <p>Acesso negado. Faça login.</p>;
  }

  return (
    <div className="p-8">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">Boletim</h1>
        <LogoutButton />
      </header>

      <main>
        <p>
          Bem-vindo, {session.user.name} ({session.user.registration})
        </p>
      </main>
    </div>
  );
}
