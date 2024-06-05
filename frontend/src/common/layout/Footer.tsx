import { twMerge } from "tailwind-merge";

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={twMerge("sticky text-center top-[100vh]", className)}
      {...props}
    >
      &copy; Physixed 2024
    </footer>
  );
};

export default Footer;

interface FooterProps {
  className?: string;
}
