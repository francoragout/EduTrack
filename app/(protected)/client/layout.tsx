import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface ClientsLayoutProps {
  children: React.ReactNode;
}

export default async function ClientsLayout({ children }: ClientsLayoutProps) {
  const session = await auth();

  if (session?.user?.role !== "USER") {
    redirect("/");
  }
  return <>{children}</>;
}
