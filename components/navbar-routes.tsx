"use client";

import Link from "next/link";
import { Clapperboard, PlusIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export const NavbarRoutes = () => {
    const role = useCurrentRole();
    const user = useCurrentUser();
    const pathname = usePathname();
    const isTeacherPage = pathname?.startsWith("/teacher");
    const isBrokerPage = pathname?.startsWith("/broker");
    const isCoursePage = pathname?.includes("/courses");
    const isCodePage = pathname?.includes("/codes");
    const isAdminPage = pathname?.includes("/admin");

    return (
        <>
            <div className="bg-card">
                {isAdminPage || isTeacherPage || isBrokerPage || isCoursePage || isCodePage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2" />
                            خروج
                        </Button>
                    </Link>
                ) : role == "ADMIN" ? (
                    <Link href="/admin/users">
                        <Button size="sm" variant="ghost">
                            صفحة المدير
                        </Button>
                    </Link>
                ) : role == "TEACHER" ? (
                    <>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground hover:text-primary mr-2"
                            asChild
                        >
                            <Link href="/teacher/courses">
                                <PlusIcon className="h-5 w-5 lg:mr-2 " />
                                <span className=" lg:block">
                                    صفحة المعلم
                                </span>
                            </Link>
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground hover:text-primary mr-2"
                            asChild
                        >
                            {/* <Link href={`/u/${user?.name}`}> */}
                            <Link href={`/u/rooms/123`}>
                                <Clapperboard className="h-5 w-5 lg:mr-2 " />
                                <span className=" lg:block">
                                    goLive
                                </span>
                            </Link>
                        </Button>
                    </>
                ) : role == "BROKER" ? (
                    <Button
                        size="sm"
                        variant="ghost"
                        className="text-muted-foreground hover:text-primary "
                        asChild
                    >
                        <Link href="/broker/codes">
                            <PlusIcon className="h-5 w-5 lg:mr-2 " />
                            <span className="hidden lg:block">
                                {/* صفحة الوكيل */}
                                Broker
                            </span>
                        </Link>
                    </Button>
                ) : null}
            </div>
        </>
    )
}
