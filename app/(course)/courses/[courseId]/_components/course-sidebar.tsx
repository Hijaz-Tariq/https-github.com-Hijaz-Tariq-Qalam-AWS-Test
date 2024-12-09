import { currentUser } from "@/lib/auth";
import { Following } from "@/app/live/(browse)/_components/sidebar/following";

import { Chapter, Course, User, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { getFollowedUsers } from "@/lib/follow-service";
import { UserItem } from "@/app/live/(browse)/_components/sidebar/user-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;

  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
};

export const CourseSidebar = async ({
  course,
  progressCount,
  data
}: CourseSidebarProps) => {
  const user = await currentUser();
  const userId = user?.id
  const following = await getFollowedUsers();

  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  const stream = await db.stream.findUnique({
    where: {
      userId: course.userId
    }
  })

  const teacher = await db.user.findUnique({
    where: {
      id: course.userId,
    }
  })

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-card">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          <Following data={following} />

          {course.title}
        </h1>
        {purchase && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">

        {course?.isLive == true ?
          <UserItem
            key={teacher?.id}
            username={teacher?.username!}
            courseId={course?.id!}
            imageUrl={teacher?.image!}
            isLive={course?.isLive}
          />
          : null
        }


        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}