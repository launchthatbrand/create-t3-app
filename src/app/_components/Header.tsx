import Logo from "./Logo";
import React from "react";
import SignInSignOutButton from "./SignInSignOutButton";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex min-h-[80px] items-center space-x-3 overflow-auto bg-slate-400 p-5 dark:bg-gray-900">
      <div className="flex flex-1 items-center justify-between space-x-3">
        <Logo />
        <SignInSignOutButton />
      </div>
    </header>
  );
}

export default Header;
