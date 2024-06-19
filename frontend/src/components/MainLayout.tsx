import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;

type MainLayoutProps = {
  children: React.ReactNode;
};
