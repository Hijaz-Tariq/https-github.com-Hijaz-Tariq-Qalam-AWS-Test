import { Button } from "@/components/ui/button";
import Link from "next/link";


const CodesPage = () => {
   
    return (
        <div className="p-6">
            <Link href="/broker/create">
                <Button>
                   رمز جديد
                </Button>
            </Link>
        </div>
    );
}


export default CodesPage;