import { auth } from "@/auth";

interface ClientsLayoutProps {
  children: React.ReactNode;
}

export default async function ClientsLayout({ children }: ClientsLayoutProps) {
  const session = await auth();

  if (session?.user?.role !== "USER") {
    return <div>You are not user</div>;
  }
  return <>{children}</>;
}
