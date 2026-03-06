import { LogOut } from "lucide-react";

import { logoutAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button className="w-full sm:w-auto" type="submit" variant="outline">
        <LogOut className="mr-2 size-4" />
        Выйти
      </Button>
    </form>
  );
}
