"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    try {
      setIsLoading(true);
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center justify-center w-[70px] h-[40px] rounded-2xl cursor-pointer
        ${isLoading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} 
        text-white transition-all duration-200`}
    >
      {isLoading ? (
        <>
          <span>Saindo</span>
        </>
      ) : (
        "Sair"
      )}
    </button>
  );
}
