"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="flex justify-start pl-2 w-full"
      size="sm"
    >
      <LogOut />
      <span>Cerrar sesión</span>
    </Button>
  );
};
export default SignOut;
