import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { ClassForm } from "./_components/classes-form";
import { DepartmentForm } from "./_components/department-form";
import { GroupForm } from "./_components/daysGroup-form";
import { StartsByForm } from "./_components/startsBy-form";
// import { CheckboxReactHookFormMultiple } from "./_components/test-form";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const user = await currentUser();
  const userId = user?.id

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      departments: {

      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const classes = await db.class.findMany({

  });
  const departments = await db.department.findMany({

  });



  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.classId,
    course.departments,
    course.startsBy,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  const SelectedOptions = classes.find((classes) => classes.id === course.classId)
  const option = SelectedOptions?.name;

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              اعدادات الدورة
            </h1>
            <span className="text-sm text-slate-700">
              يجب اكمال جميع الحقول {completionText}
            </span>
          </div>
          <Actions
            initialData={course}
            disabled={!isComplete || course.status !== 'PENDING'}
            courseId={params.courseId}
            status={course.status}
            isPublished={course.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                الوصف العام للدورة
              </h2>
            </div>
            <TitleForm
              initialData={course}
              courseId={course.id}
            />
            <DescriptionForm
              initialData={course}
              courseId={course.id}
            />
            <ImageForm
              initialData={course}
              courseId={course.id}
            />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  دروس الدورة
                </h2>
              </div>
              <ChaptersForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  الاعدادات الخاصة بالدورة
                </h2>
              </div>
              <ClassForm
                initialData={course}
                courseId={course.id}
                options={classes.map((classes) => ({
                  label: classes.name,
                  value: classes.id,
                }))}
              />
              {option === "الصف الحادي عشر" || option === "الصف الثاني عشر" || option === "جامعي" ?
                <DepartmentForm
                  initialData={course}
                  courseId={course.id}
                  options={departments.map((departments) => ({
                    name: departments.name,
                    id: departments.id,
                  }))}
                />
                : null}
              <StartsByForm
                initialData={course}
                courseId={course.id}
                startsBy={course.startsBy}
              />
              <GroupForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  المراجع و الملفات الخاصة بالدورة
                </h2>
              </div>
              <AttachmentForm
                initialData={course}
                courseId={course.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseIdPage;