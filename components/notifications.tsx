import { BellIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function Notifications() {
  return (
    <Button className="rounded-full" variant="outline" size="icon">
      <BellIcon />
    </Button>
  );
}
