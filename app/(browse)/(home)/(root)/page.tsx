import { currentUser } from "@/lib/auth";
import { getBalance } from "@/actions/balance";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Clock, PlusCircle } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const user = await currentUser();

  const userId = user?.id

  if (!userId) {
    return redirect("/");
  }

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  const userBalance = await getBalance(userId);

  return (
    <div className="p-6 space-y-4">
    <div className="font-medium flex items-center justify-between"> الرصيد: {userBalance} ₪ 
    <Link href="/broker/scan">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            اضافة رصيد
          </Button>
        </Link>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
