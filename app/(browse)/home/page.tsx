import { currentUser } from "@/lib/auth";
import { getBalance } from "@/actions/balance";

import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";

import { Categories } from "../(home)/search/_components/categories";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Banner } from "@/components/banner";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const SearchPage = async ({
  searchParams
}: SearchPageProps) => {
  const user = await currentUser();
  const userId = "01c4d3fd"

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  const userBalance = await getBalance(userId);

  return (
    <>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 ">
          <Categories
            items={categories}
          />
        </div>
      
        <CoursesList items={courses} />
      </div>
     
    </>
  );
}

export default SearchPage;