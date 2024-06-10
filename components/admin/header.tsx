"use client";

import { useAppStore } from "@/store";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { AdminType } from "@/types";

const Header = () => {
  const { collapsSidbar, setCollapsSidbar } = useAppStore();
  const [adminDetails, setAdminDetails] = useState<AdminType | undefined>();
  const user = useAuthUser();

  useEffect(() => {
     if(user) {
      setAdminDetails(user)
     }
  }, [user]);
  
  return (
    <div className="flex">
      <div className="hidden md:flex-1 md:flex md:justify-start ">
        <Button
          className="bg-transparent hover:bg-transparent"
          onClick={() => setCollapsSidbar(!collapsSidbar)}
        >
          <HiOutlineMenuAlt2 size={22} />
        </Button>
      </div>
      <div className="border border-l border-secondary-black mr-10 my-2"></div>
      <div className="mr-10 text-primary-text">
        <div className="flex justify-center items-center gap-4 py-1">
          {adminDetails?.user?.firstName && (
            <>
              <Avatar className="rounded-full">
                <AvatarImage
                  className="rounded-full"
                  src={
                    // user?.image && adminDetails?.firstName
                    //   ? user.image
                    //   : `https://ui-avatars.com/api/?background=7839ee&color=fff&name=${
                      `https://ui-avatars.com/api/?background=7839ee&color=fff&name=demo`
                    //       adminDetails?.firstName + " " + adminDetails?.lastName
                    //     }`
                  }
                  width={40}
                  height={40}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>
                {adminDetails?.user?.firstName?.charAt(0).toUpperCase() +
                  adminDetails?.user?.firstName?.slice(1) +
                  " " +
                  (adminDetails?.user?.lastName?.charAt(0).toUpperCase() +
                    adminDetails?.user?.lastName?.slice(1))}
              </p>
            </>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Header;
