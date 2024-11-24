import { auth } from "@/auth";
import { LoginForm } from "@/components/home/login-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // if (session?.user?.role === "ADMIN" || session?.user?.role === "EDITOR") {
  //   redirect("/administration/classrooms");
  // } else if (session?.user?.role === "USER") {
  //   redirect("/client/students");
  // }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Link href="/administration/classrooms">Administration</Link>
      <LoginForm />
    </div>
  );
}
