"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { UserButtonItem } from "./userButton-item";

const guestRoutes = [
    {
        icon: Layout,
        label: "ملفاتي",
        href: "/",
    },
    {
        icon: Compass,
        label: "تصفح",
        href: "/search",
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: "الدورات",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "احصائيات",
        href: "/teacher/analytics",
    },
]

export const UserButtonRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <UserButtonItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}