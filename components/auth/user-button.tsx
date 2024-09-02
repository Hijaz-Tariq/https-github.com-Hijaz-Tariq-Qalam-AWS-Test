"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { UserButtonRoutes } from "@/components/userButton-routes";
import { NavbarRoutes } from "@/components/navbar-routes";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <NavbarRoutes />
        <UserButtonRoutes />
        <Link href="/profile" >
          <DropdownMenuItem>
            <PersonIcon className="h-4 w-4 mr-2" />
            الاعدادات
          </DropdownMenuItem>
        </Link>
        <Link href="/home/policy" >
          <DropdownMenuItem>
            <PersonIcon className="h-4 w-4 mr-2" />
            سياسة الخصوصية          </DropdownMenuItem>
        </Link>
        <Link href="/home/terms/" >
          <DropdownMenuItem>
            <PersonIcon className="h-4 w-4 mr-2" />
            شروط الاستخدام
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            تسجيل خروج
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
