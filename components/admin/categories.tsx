"use client";

import { useEffect, useState } from "react";
import { AddCategorySideBar } from "./add-category-sidebar";
import CategoriesTable from "./categories-table";

const Categories = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="text-primary-txt w-full">
      <div className="text-2xl w-full flex justify-center items-center font-medium mt-4">
        <div className="flex-1">Categories</div>
        <AddCategorySideBar />
      </div>
      <div>
        <CategoriesTable categories={true}/>
      </div>
    </div>
  );
};

export default Categories;
