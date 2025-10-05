"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings, ThumbsUp } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function SidebarMenuApp() {
  const pathname = usePathname();

  const mainItems = [
    { name: "Boletim", icon: Home, href: "/boletim" },
    { name: "Histórico", icon: FileText, href: "/historico-sistema" },
    { name: "Orientações", icon: ThumbsUp, href: "/orientacao-sistema" },
  ];

  const supportItem = {
    name: "Suporte",
    icon: Settings,
    href: "/suporte-sistema",
  };

  return (
    <SidebarContent className="p-4 bg-blue-950 flex flex-col h-full">
      <SidebarGroup className="flex-1">
        <SidebarGroupLabel className="text-2xl font-semibold text-white mb-5">
          Menu
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="mt-2 space-y-2">
            {mainItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link href={item.href} key={item.name}>
                  <SidebarMenuItem
                    className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-all
                      ${
                        isActive
                          ? "bg-yellow-500 text-white"
                          : "text-white hover:bg-yellow-500/20 hover:text-yellow-400"
                      }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </SidebarMenuItem>
                </Link>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarMenuItem className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-all mt-auto bg-blue-800 text-white hover:bg-blue-800/20">
        <Link
          href={supportItem.href}
          className="flex items-center gap-2 w-full"
        >
          <supportItem.icon className="h-4 w-4" />
          {supportItem.name}
        </Link>
      </SidebarMenuItem>
    </SidebarContent>
  );
}
