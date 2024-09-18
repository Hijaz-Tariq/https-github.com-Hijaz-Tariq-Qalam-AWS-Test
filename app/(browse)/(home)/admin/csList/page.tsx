import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { currentRole } from "@/lib/auth";

const CsListPage = async () => {
    const role = await currentRole();

    if (role !== "ADMIN") {
        return redirect("/");
    }

    const classes = await db.class.findMany({
        include: {
            courses: true,
            department: true,
        }
    });

    const categories = await db.category.findMany({
        include: {
            courses: true,
        }
    });

    return (
        <div className="p-6">
            {/* <DataTable/> */}
            <DataTable data={classes} categories={categories}
            //  subRows={{
            //     department: []
            // }}  
            />
        </div>
    );
}

export default CsListPage;

//-------------------------------------------------------------------



