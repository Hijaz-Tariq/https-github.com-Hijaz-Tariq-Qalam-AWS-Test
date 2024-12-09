import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { DialogDemo } from "../create/page";
import QRCodeCard from "./_components/qr-card";
const CodesPage = async () => {
    const user = await currentUser()
    const userId = user?.id

    if (!userId) {
        return redirect("/");
    }

    const codes = await db.code.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <>
            <div className="m-2 flex justify-between">
                <h2 className="m-2 flex flex-col">رصيدك الحالي: 500</h2>
                <h2 className="m-2 flex flex-col">اضافة رصيد</h2>
            </div>
            <div className="p-6 flex justify-center">
                <DialogDemo>
                    <Button>
                        رمز جديد
                    </Button>
                </DialogDemo>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                {/* Render QRCodeCard for each code */}
                {codes.map((code) => {
                    // Construct the QR code value using the code's data
                    const formattedDate = new Date(code.createdAt).toLocaleString();
                    const qrCodeData = {
                        codeUrl: code.codeUrl,
                        title: code.title,
                        websiteLink: "http://e-qalam.com/broker/scan", // Use the website link you used in QRCreatePage
                    };

                    const qrCodeValue = JSON.stringify(qrCodeData);

                    return (
                        <QRCodeCard
                            key={code.id}
                            qrCodeValue={qrCodeValue}
                            title={code.title} // Display the title
                            date={formattedDate}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default CodesPage;