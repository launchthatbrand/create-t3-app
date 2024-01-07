import { Input } from "~/components/ui/input";
import React from "react";
import UserDropdown from "./UserDropdown";

function AdminNavbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="left-0 top-0 z-10 mb-20 flex w-full items-center bg-transparent md:flex-row md:flex-nowrap md:justify-start">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between md:flex-nowrap ">
          {/* Brand */}
          <a
            className="hidden text-sm font-semibold uppercase text-white lg:inline-block"
            href="#pablo"
            // onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <form className="mr-3 hidden flex-row flex-wrap items-center md:flex lg:ml-auto">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="text-blueGray-300 absolute  z-10 h-full w-8 items-center justify-center rounded bg-transparent py-3 pl-3 text-center text-base font-normal leading-snug">
                <i className="fas fa-search"></i>
              </span>
              <Input
                type="text"
                placeholder="Search here..."
                className="placeholder-blueGray-300 text-blueGray-600 relative w-full rounded border-0 bg-white px-3 py-3 pl-10 text-sm shadow outline-none focus:outline-none focus:ring"
              />
            </div>
          </form>
          {/* User */}
          <ul className="hidden list-none flex-col items-center md:flex md:flex-row">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

export default AdminNavbar;
