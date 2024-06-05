import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-4 grow md:px-10 lg:px-15">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

type MainLayoutProps = {
  children: React.ReactNode;
};
