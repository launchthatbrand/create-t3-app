import Logo from "./Logo";
import React from "react";
import SignInSignOutButton from "./SignInSignOutButton";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex min-h-[80px] items-center space-x-3 overflow-auto bg-slate-100 p-3 shadow-md dark:bg-gray-900">
      <div className="container flex flex-1 items-center justify-between space-x-3">
        <Logo />
        {/* <SignInSignOutButton /> */}
      </div>
    </header>
  );
}

export default Header;
