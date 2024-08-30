import AuthButton from "@/components/header-auth";
import Header from "@/components/hero";
import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <nav className="py-4">
        <AuthButton />
      </nav>
      <div className="mt-12">{children}</div>
    </div>
  );
};

export default RootLayout;
