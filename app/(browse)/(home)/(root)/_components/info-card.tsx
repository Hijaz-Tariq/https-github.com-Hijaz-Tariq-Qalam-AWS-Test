import { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/icon-badge"
import { Separator } from "@/components/ui/separator";

interface InfoCardProps {
  numberOfItems: number;
  variant?: "default" | "success";
  label: string;
  icon: LucideIcon;
}

export const InfoCard = ({
  variant,
  icon: Icon,
  numberOfItems,
  label,
}: InfoCardProps) => {

  return (
    <div className="px-0.125">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-2.5 p-4">
          <IconBadge
            variant={variant}
            icon={Icon}
          />
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              {label}
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
            </p>
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};
