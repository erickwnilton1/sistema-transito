"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await authClient.signOut();
    router.push("/");
  }
  return (
    <div className="flex items-center justify-center w-[50px] h-[40px] rounded-2xl m-1 bg-red-500 hover:bg-red-600 cursor-pointer">
      <button onClick={handleLogout} className="text-white m-2 cursor-pointer">
        Sair
      </button>
    </div>
  );
}
