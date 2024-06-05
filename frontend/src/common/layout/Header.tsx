import { twMerge } from "tailwind-merge";
import Logo from "../components/Logo";
import Nav from "../components/Nav";

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <>
      <header
        className={twMerge(
          "mb-4 px-4 top-0 z-[20] flex flex-wrap items-center justify-between md:px-10 lg:px-15",
          className
        )}
        {...props}
      >
        <Logo />
        <Nav />
      </header>
    </>
  );
};

export default Header;

interface HeaderProps {
  className?: string;
}
