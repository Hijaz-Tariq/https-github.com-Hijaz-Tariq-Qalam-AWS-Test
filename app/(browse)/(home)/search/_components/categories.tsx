"use client";

import { Category } from "@prisma/client";
import {
  FcOrganization,
  FcEnteringHeavenAlive,
  FcSalesPerformance,
  FcCalculator,
  FcGlobe,
  FcHighBattery,
  FcWorkflow
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "رياضيات": FcCalculator,
  "لغات": FcGlobe,
  "فيزياء": FcWorkflow,
  "كيمياء": FcHighBattery,
  "ادارة": FcSalesPerformance,
  "تكنولوجيا": FcEnteringHeavenAlive,
  "اخرى": FcOrganization,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
   
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 ">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}