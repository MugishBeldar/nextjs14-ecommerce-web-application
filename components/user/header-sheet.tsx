"use client";
import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger } from "@/components/ui/sheet";

const HeaderSheet = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleMenu = () => {
    setToggle((prevToggle) => !prevToggle);
  };

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
            <div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Mobiles
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Air Conditioners
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Televisons
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Laptops
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Headphones & Earphones
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Coolers
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Home Theatres & Soundbars
              </div>
              <div className="text-lg font-medium my-3 cursor-pointer mx-2">
                Mobiles
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export { HeaderSheet };
