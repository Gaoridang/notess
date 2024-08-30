import React, { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return <div className="max-w-2xl mx-auto py-12">{children}</div>;
};

export default RootLayout;
