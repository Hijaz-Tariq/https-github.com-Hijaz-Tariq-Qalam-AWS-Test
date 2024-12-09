import Image from "next/image";
import { Tajawal } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Tajawal({
    subsets: ["arabic"],
    weight: ["200", "300", "400", "500", "700", "800"],
});

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-2">
            <div>
                <Image
                    src="/qalam.svg"
                    alt="Qalam"
                    height="100"
                    width="100"
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className,
            )}>
                <p className="text-sm text-muted-foreground">
                    بوابة قلم
                </p>
            </div>
        </div>
    );
};
