"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { IoMenuOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { CategoryTypes } from "@/types";
import { getCategories } from "@/actions/category";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const HeaderSheet = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async function () {
      const response = await getCategories();
      if (response?.length) {
        setCategories(response);
      }
    })();
  }, [toggle])

  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  const handleCategory = (categoryId: string) => {
    setToggle((prevToggle) => !prevToggle);
    router.push(`/category/${encodeURIComponent(categoryId)}`);
  }
  return (
    <Sheet open={toggle} onOpenChange={setToggle}>
      <SheetTrigger onClick={toggleMenu}>
        {toggle ? <X size={25} /> : <IoMenuOutline size={25} />}
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className={cn(`mt-20 bg-primary-dark pointer-events-none border-t border-r-primary-txt  rounded-sm  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]`, toggle ? "block" : "hidden")}
      >
        <SheetHeader>
          <SheetTitle className="text-primary-txt font-bold text-2xl">
            Shop by Category
          </SheetTitle>
          <SheetDescription className="text-primary-txt">
            {
              categories.length > 0 ?
                <div>
                  {
                    categories.map(category => {
                      return (
                        <div key={category.id} className="text-lg font-medium my-3 cursor-pointer mx-2  hover:border-b border-b-gray-400" onClick={()=>handleCategory(category.id)}>
                          {category.categoryName}
                        </div>
                      )
                    })
                  }
                </div>
                : <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                  No categories found. Please add some categories in the admin panel.
                </div>
            }
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export { HeaderSheet };
