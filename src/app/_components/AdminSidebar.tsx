"use client";

import AdminSidebarNavigation from "./AdminSidebarNavigation";
import { AiFillEnvironment } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import Link from "next/link";
import { RiDashboardFill } from "react-icons/ri";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Request Forms",
      submenu: true,
      submenuItems: [
        { title: "Purchase Request", href: "/forms/purchaserequest" },
        { title: "Travel Request", href: "/forms/travelrequest" },
        { title: "Submenu 3" },
      ],
    },
    { title: "Analytics" },
    { title: "Inbox" },
  ];

  return (
    <div className={`relative p-5 pt-8 ${open ? "w-72" : "w-20"} duration-500`}>
      <BsArrowLeftShort
        className={`absolute -right-3 top-9 cursor-pointer rounded-full border border-black bg-white text-3xl duration-150 ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex">
        <AiFillEnvironment
          className={`float-left mr-2 block cursor-pointer rounded bg-amber-300 text-4xl duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`origin-left text-2xl font-medium text-white duration-500 ${
            !open && "scale-0"
          }`}
        >
          Tailwind
        </h1>
      </div>

      <ul className="pt-2">
        {Menus.map((menu, index) => (
          <>
            <li
              key={index}
              className="mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-white"
            >
              <span className="float-left block text-2xl">
                <RiDashboardFill />
              </span>
              <Link
                key={index}
                href={menu.href ?? "#"}
                className={`flex-1 origin-left text-base font-medium duration-300 ${
                  !open && "scale-0"
                }`}
              >
                {menu.title}
              </Link>

              {menu.submenu && open && (
                <BsChevronDown
                  className={`${submenuOpen && "rotate-180"}`}
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                />
              )}
            </li>
            {menu.submenu && submenuOpen && open && (
              <div>
                {menu.submenuItems.map((submenuItem, index) => (
                  <Link
                    key={index}
                    href={submenuItem.href ?? "#"}
                    className={
                      buttonVariants({ variant: "ghost" }) +
                      "flex w-full items-start !justify-start bg-transparent text-left"
                    }
                  >
                    {submenuItem.title}
                  </Link>
                ))}
              </div>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
