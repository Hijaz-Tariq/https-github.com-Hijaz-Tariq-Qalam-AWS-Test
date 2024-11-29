"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-200 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-700",
        isActive && "text-slate-200 bg-slate-900 hover:bg-slate-700/20 hover:text-slate-400",
        isCompleted && "text-sky-500 hover:text-sky-700",
        isCompleted && isActive && "bg-slate-500/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-200",
            isActive && "text-slate-400",
            isCompleted && "text-sky-200"
          )}
        />
        {label}
        
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-slate-200 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-emerald-300"
      )} />
    </button>
  )
}