"use client";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import { LuLogOut, LuShoppingBag } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BsCartCheck } from "react-icons/bs";
import {
  Sidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";
import { signOut } from "next-auth/react";
import { IoShirtOutline } from "react-icons/io5";

const Side = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState("/admin/dashboard");
  const [toggled, setToggled] = useState(false);
  const { collapsSidbar } = useAppStore();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSelectedItem(pathname);
  }, [pathname]);

  const menuItems = [
    { label: "Dashboard", icon: <RxDashboard />, link: "/admin/dashboard" },
    {
      label: "Categories",
      icon: <BsCartCheck />,
      link: "/admin/categories",
    },
    {
      label: "Products",
      icon: <IoShirtOutline />,
      link: "/admin/products",
    },
    {
      label: "Orders",
      icon: <LuShoppingBag />,
      link: "/admin/order",
    },
  ];

  const handleItemClick = (link: string) => {
    setSelectedItem(link);
    router.push(link);
  };
  if (!isMounted) {
    return null;
  }

  return (
    <div className={` border-none ${collapsSidbar ? "collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsSidbar}
        className={cn("overflow-hidden border-none h-screen ")}
        toggled={toggled}
        onBackdropClick={() => setToggled((prev) => !prev)}
        style={{ borderRightColor: "var(--secondary-black)" }}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "#1D1E24",
            "&:hover": {
              backgroundColor: "#1D1E24",
            },
          },
        }}
      >
        <div className="text-primary-txt flex  items-center justify-center gap-3 pl-[15px] my-5">
          <svg
            fill="none"
            height="48"
            viewBox="0 0 44 48"
            width="60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="#0090ff">
            
              <path d="m16 8 5.0912 10.9088 10.9088 5.0912-10.9088 5.0912-5.0912 10.9088-5.0912-10.9088-10.9088-5.0912 10.9088-5.0912z" />
              <path
                d="m20.0469 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z"
                opacity=".7"
              />
              <path
                d="m32 31.3286 6.3539-1.0932 3.6 9.7646 3.6-9.7646 10.2565 1.7646-6.6564-8 6.6564-8-10.2565 1.7646-3.6-9.7646-3.6 9.7646-6.3539-1.0932 1.0442 2.2374 10.9088 5.0912-10.9088 5.0912z"
                opacity=".5"
              />
            </g>
          </svg>
          <p
            className={cn(
              !collapsSidbar ? "text-start text-lg font-semibold" : "hidden"
            )}
          >
            <span className="text-secondary-blue opacity-70">Crypto</span>
            <span className="text-secondary-blue">Store</span>
          </p>
        </div>
        <Menu
          className="text-white overflow-hidden border-none"
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              const backgroundColor = level === 0 ? "" : "#23262B";
              return {
                backgroundColor: active ? "#23262B" : backgroundColor,
                color: active? '#0090ff':"",
                "&:hover": {
                  backgroundColor: active ? "#212c3a" : "#2c3a4d",
                },
              };
            },
          }}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {
                <MenuItem
                  onClick={() => handleItemClick(item.link)}
                  icon={item.icon}
                  active={selectedItem === item.link}
                >
                  {item.label}
                </MenuItem>
              }
            </React.Fragment>
          ))}
          <MenuItem
            onClick={() =>
              signOut({ redirect: true, callbackUrl: "/admin" })
            }
            icon={<LuLogOut />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Side;
