"use client";
import React, { useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store";
import AddCategoryForm from "./add-category-form";
import { getCategories } from "@/actions/category";

const AddCategorySideBar = () => {
  const { toggleSheet, setToggleSheet, categoriesData, setCategoriesData } = useAppStore();
  const toggleMenu = () => {
    setToggleSheet(!toggleSheet);
  };
  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();
      if (response && response.length > 0) {
        setCategoriesData(response);
      }
    }
    fetchCategories();
  }, [setCategoriesData]);

  return (
    <div className="">
      <Sheet open={toggleSheet} onOpenChange={setToggleSheet}>
        <SheetTrigger onClick={toggleMenu}>
          <Button
            variant={"ghost"}
            className="bg-secondary-blue rounded-2xl hover:bg-secondary-blue"
          >
            <FiPlus />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className={`bg-primary-background rounded-lg border-none`}
        >
          <SheetHeader>
            <SheetTitle className="text-primary-text font-bold text-2xl my-4">
              Add Category
            </SheetTitle>
            <SheetDescription className="text-primary-txt h-full">
              <div className="h-full">
                <AddCategoryForm />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export { AddCategorySideBar };
