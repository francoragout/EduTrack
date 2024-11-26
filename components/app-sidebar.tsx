"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd, MoonIcon, SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { Badge } from "./ui/badge";
import { useTheme } from "next-themes";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Usuarios",
      items: [
        {
          title: "Administradores",
          url: "/administration/admins",
        },
        {
          title: "Preceptores",
          url: "/administration/preceptors",
        },
      ],
    },
    {
      title: "Institución",
      items: [
        {
          title: "Aulas",
          url: "/administration/classrooms",
        },
        {
          title: "Vista en general",
          url: "/administration/overview",
        },
      ],
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: React.ComponentProps<typeof Sidebar> & { session: any }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Image
                src="/EduTrackBook.svg"
                width={48}
                height={48}
                alt="EduTrack logo"
                className="invert brightness-200 dark:brightness-0 -ml-1.5"
              />
              <div className="flex flex-col gap-0.5 leading-none ms-1">
                <span className="font-semibold">EduTrack</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuButton className="flex justify-between">
            Notificaciónes <Badge>0</Badge>
          </SidebarMenuButton>
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenuButton
            onClick={toggleTheme}
            className="flex justify-between"
          >
            Tema
            <div className="flex">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
          </SidebarMenuButton>
        </SidebarGroup>

        <NavUser session={session} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
