import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { currentRole } from "@/lib/auth";

const UsersPage = async () => {
    const role = await currentRole()
    // const userId = user?.id

    if (role !== "ADMIN") {
        return redirect("/");
    }

    const users = await db.user.findMany({
        // where: {
        //     userId,
        // },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-6">
            <DataTable columns={columns} data={users} />
        </div>
    );
}

export default UsersPage;