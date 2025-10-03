"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
  }
  return <button onClick={handleLogout}>Sair</button>;
}
