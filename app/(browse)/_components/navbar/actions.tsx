import { currentUser } from "@/lib/auth";

import { LoginButton } from "@/components/auth/login-button";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user && (
        <LoginButton>
          <Button size="sm" variant="primary">
            Login
          </Button>
        </LoginButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-4">
          <UserButton />
        </div>
      )}
    </div>
  );
};
