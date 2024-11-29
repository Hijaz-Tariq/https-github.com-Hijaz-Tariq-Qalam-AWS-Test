import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LayoutDashboard, ListChecks } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { UsernameForm } from "./_components/username-form";
import { BioForm } from "./_components/bio-form";
import { CityForm } from "./_components/city-form";
import { IdImageForm } from "./_components/attachment-form";
import { JobRequestForm } from "./_components/actions";
import { BirthdayForm } from "./_components/birthday-form";
import { PasswordForm } from "./_components/newPassword-form";
import { EmailForm } from "./_components/email-form";
import { PhoneForm } from "./_components/phone-form";
import { GenderForm } from "./_components/gender-form";
import { ClassForm } from "./_components/class-form";
import { JobForm } from "./_components/job-form";

const UserInfoPage = async ({ params }: { params: { userId: string } }) => {
  const getUser = await currentUser();
  const userId = getUser?.id;

  if (!userId) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      idImages: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const classes = await db.class.findMany({});

  const cities = await db.city.findMany({
    orderBy: {
      name: "asc",
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

  const calculateAge = (birthday: Date) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const userAge = user.birthday ? calculateAge(user.birthday) : null;

  return (
    <>
      <div className="flex items-center gap-x-2"></div>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">اعدادات المستخدم</h1>
            <span className="text-sm text-slate-700">
              {!isComplete && <>يجب تعبئة جميع الحقول {completionText}</>}
              {isComplete && userAge! >= 20 && (
                <JobRequestForm
                  initialData={{
                    jobRequest: user.jobRequest!,
                  }}
                  userId={user.id}
                  role={user.role}
                />
              )}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your user</h2>
            </div>
            <UsernameForm
              userId={user.id}
              initialData={{
                username: user.username!,
              }}
            />
            <BioForm initialData={user} userId={user.id} />
            <PasswordForm />
            {userAge! <= 20 && (
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
                <h2 className="text-xl">user chapters</h2>
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
                  sex: user.sex,
                }}
                userId={user.id}
              />
              <EmailForm />
              <PhoneForm
                initialData={{
                  phone: user.phone!,
                }}
                userId={user.id}
              />
            </div>
            <div>
              <IdImageForm initialData={user} id={user.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
