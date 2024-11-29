import { Banner } from "@/components/banner";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";


const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Container>
                    <Banner
                        label="تنويه: الموقع ما زال قيد التطوير , نرجوا محادثتنا في حال واجهتك اي مشكلة"
                    />
                    {children}
                </Container>
            </div>
        </>
    );
}

export default BrowseLayout;