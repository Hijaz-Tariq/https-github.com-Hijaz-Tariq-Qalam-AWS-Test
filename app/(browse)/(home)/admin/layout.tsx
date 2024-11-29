import { redirect } from "next/navigation";

import { currentRole } from "@/lib/auth";

import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: { username: string };
    children: React.ReactNode;
};

const AdminLayout = async ({
    params,
    children,
}: CreatorLayoutProps) => {

    const role = await currentRole()
    if (role !== 'ADMIN') {
        redirect("/");
    }

    return (
        <>
            <Navbar />
            <div className="flex h-full">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
}

export default AdminLayout;