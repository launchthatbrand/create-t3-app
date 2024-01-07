"use client";

import AdminSidebarNavigation from "./AdminSidebarNavigation";
import { AiFillEnvironment } from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { useState } from "react";

function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const Menus = [
    { title: "Dashboard" },
    { title: "Pages" },
    { title: "Media", spacing: true },
    {
      title: "Projects",
      submenu: true,
      submenuItems: [
        { title: "Submenu 1" },
        { title: "Submenu 2" },
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
              <span
                className={`flex-1 origin-left text-base font-medium duration-300 ${
                  !open && "scale-0"
                }`}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown
                  className={`${submenuOpen && "rotate-180"}`}
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                />
              )}
            </li>
            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <li
                    key={index}
                    className="mt-2 flex cursor-pointer items-center gap-x-4 rounded-md p-2 px-5 text-sm hover:bg-white"
                  >
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default AdminSidebar;
