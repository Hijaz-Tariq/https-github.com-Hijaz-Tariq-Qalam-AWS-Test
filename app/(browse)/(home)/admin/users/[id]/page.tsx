// import { getUserById } from "@/data/user";


// const UserPage = async ({
//   params
// }: {
//   params: { id: string }
// }) => {
//   const userId = params.id;
//   const user = await getUserById(userId);
// console.log(params.id)
// console.log(params)
//   return ( 
//     <>
//     <div>
//       Hello from user page!
//       ID: {user?.id}
//       Name: {user?.username}
//     </div>

//     <div>
//       {/* from params {params.username}, userId: */}
// {userId}
//     </div>
//     </>
//    );
// }

// export default UserPage;


import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { UsernameForm } from "@/app/(browse)/(home)/(user)/profile/_components/username-form";

import { PasswordForm } from "@/app/(browse)/(home)/(user)/profile/_components/newPassword-form";
import { BioForm } from "@/app/(browse)/(home)/(user)/profile/_components/bio-form";
import { ClassForm } from "@/app/(browse)/(home)/(user)/profile/_components/class-form";
import { JobForm } from "@/app/(browse)/(home)/(user)/profile/_components/job-form";
import { CityForm } from "@/app/(browse)/(home)/(user)/profile/_components/city-form";
import { BirthdayForm } from "@/app/(browse)/(home)/(user)/profile/_components/birthday-form";
import { GenderForm } from "@/app/(browse)/(home)/(user)/profile/_components/gender-form";
import { EmailForm } from "@/app/(browse)/(home)/(user)/profile/_components/email-form";
import { PhoneForm } from "@/app/(browse)/(home)/(user)/profile/_components/phone-form";
import { IdImageForm } from "@/app/(browse)/(home)/(user)/profile/_components/attachment-form";

import { RoleForm } from "./_components/role-form";

import { $Enums, UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
// import { AttachmentsShowForm } from "./_components/attachments-form";
import Link from "next/link";

const UserPage = async ({
  params
}: {
  params: { id: string }
}) => {
  // const user = await getUserById(params.id)
  const role = await currentRole();
  const classes = await db.class.findMany({

  });

  const cities = await db.city.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // const userId = user?.id

  if (role !== "ADMIN") {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      id: params.id,
    },
    include: {
      idImages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return redirect("/");
  }

  const requiredFields = [
    user.bio,
    user.birthday,
    user.cityId,
    user.password,
    user.email,
    user.idImages.length > 0,
    user.classId || user.job,
    user.phone,
    user.sex,
    user.username,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  console.log(user.role)

  const roles = $Enums.UserRole
  // return (
  // <>
  //   {/* {!course.isPublished && (
  //     <Banner
  //       label="This course is unpublished. It will not be visible to the students."
  //     />
  //   )} */}
  //   <div className="p-6">
  //     <div className="flex items-center justify-between">
  //       <div className="flex flex-col gap-y-2">
  //         <h1 className="text-2xl font-medium">
  //           Course setup
  //         </h1>
  //         <span className="text-sm text-slate-700">
  //           {/* Complete all fields {completionText} */}
  //         </span>
  //       </div>
  //       {/* <Actions
  //         disabled={!isComplete}
  //         courseId={params.courseId}
  //         isPublished={course.isPublished}
  //       /> */}
  //     </div>
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
  //       <div>
  //         <div className="flex items-center gap-x-2">
  //           <IconBadge icon={LayoutDashboard} />
  //           <h2 className="text-xl">
  //             Customize your course
  //           </h2>
  //         </div>
  //         <UsernameForm
  //           initialData={{
  //             username: user.username!
  //           }}
  //           userId={user.id!}
  //         />
  //         {/* <DescriptionForm
  //           initialData={course}
  //           courseId={course.id}
  //         /> */}
  //         {/* <ImageForm
  //           initialData={course}
  //           courseId={course.id}
  //         /> */}


  //         {/* <RoleForm initialData={user}
  //           id={user.id}
  //           options={categories.map((category) => ({
  //             label: UserRole,
  //             value: category.id,
  //           }))}

  //         /> */}
  //         <RoleForm
  //           initialData={user}
  //           id={user.id} options={[]}
  //           role={user.role}
  //           jobRequest={user.jobRequest!}
  //         />



  //       </div>
  //       <div className="space-y-6">
  //         <div>
  //           <div className="flex items-center gap-x-2">
  //             <IconBadge icon={ListChecks} />
  //             <h2 className="text-xl">
  //               Course chapters
  //             </h2>
  //           </div>
  //           {/* <ChaptersForm
  //             initialData={course}
  //             courseId={course.id}
  //           /> */}
  //         </div>
  //         <div>
  //           <div className="flex items-center gap-x-2">
  //             <IconBadge icon={CircleDollarSign} />
  //             <h2 className="text-xl">
  //               Sell your course
  //             </h2>
  //           </div>
  //           {/* <PriceForm
  //             initialData={course}
  //             courseId={course.id}
  //           /> */}
  //         </div>
  //         <div>
  //           <div className="flex items-center gap-x-2">
  //             <IconBadge icon={File} />
  //             <h2 className="text-xl">
  //               Resources & Attachments
  //             </h2>
  //           </div>
  //           {/* <AttachmentForm
  //             initialData={course}
  //             courseId={course.id}
  //           /> */}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </>




  // );

  const calculateAge = (birthday: Date) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const userAge = user.birthday ? calculateAge(user.birthday) : null;


  return (
    <>

      <div className="flex items-center gap-x-2">

      </div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              اعدادات المستخدم

            </h1>
            
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}

              {isComplete && (<RoleForm
                initialData={user}
                id={user.id} options={[]}
                role={user.role}
                jobRequest={user.jobRequest!}
              />
              )}

            </span>
          </div>
         {/* <AttachmentsShowForm /> */}
{/* <Link href='#'> Id-Images</Link> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your user
              </h2>
            </div>
            <UsernameForm
              userId={user.id} initialData={{
                username: user.username!
              }} />
            <BioForm
              initialData={user}
              userId={user.id}
            />
            <PasswordForm />

            {/* <NewPasswordForm /> */}

            {/* <ImageForm
              initialData={user}
              userId={user.id}
            /> */}
            {userAge! < 20 && (
              <ClassForm
                initialData={user}
                userId={user.id}
                options={classes.map((classes) => ({
                  label: classes.name,
                  value: classes.id,
                }))}
              />
            )}

            {userAge! >= 20 && (

              <JobForm
                userId={user.id}
                initialData={{
                  job: user.job!,
                  foundation: user.foundation!,
                }}
              />

            )}
            <CityForm
              initialData={user}
              userId={user.id}
              options={cities.map((city) => ({
                label: city.name,
                value: city.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  user chapters
                </h2>
              </div>
            </div>
            <div>

              <BirthdayForm
                initialData={user}
                userId={user.id}
                birthday={user.birthday!}
              />
              <GenderForm
                initialData={{
                  sex: user.sex
                }}
                userId={user.id} />
              <EmailForm />
              <PhoneForm initialData={{
                phone: user.phone!
              }} userId={user.id} />

            </div>
            <div>

            {user.idImages.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-card border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {/* {attachment.name} */}
                      وثيقة
                    </p>
                  </a>
                ))}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;