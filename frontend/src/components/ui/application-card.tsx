import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const ApplicationCard = ({
  title,
  description,
  href,
  image,
  alt,
}: ApplicationCardProps) => {
  return (
    <div
      className="group
      mb-3
      sm:mb-8
      last:mb-10"
    >
      <Link href={href}>
        <Card
          className="min-w-[42rem]
      overflow-hidden
      sm:pr-8 relative
      sm:h-[20rem]
      hover:bg-popover/50
      transition
      sm:group-even:pl-8"
        >
          <CardHeader
            className="pt-4
        pb-7
        px-5
        sm:pl-10
        sm:pr-2
        sm:pt-10
        sm:max-w-[50%]
        flex
        justify-center
        items-center
        flex-col
        h-full
        sm:group-even:ml-[18rem]"
          >
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <Image
            src={image}
            alt={alt ? alt : ""}
            quality={95}
            className="absolute
          hidden
          sm:block
          top-8 -right-40 w-[28.25rem]
          rounded-t-lg shadow-2xl
          transition
          group-hover:scale-[1.04]
          group-hover:-translate-x-3
          group-hover:translate-y-3
          group-hover:-rotate-2
          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-3
          group-even:group-hover:rotate-2

          group-even:right-[initial] group-even:-left-40"
          />
        </Card>
      </Link>
    </div>
  );
};

type ApplicationCardProps = {
  title: string;
  description: string;
  alt?: string;
  href: string;
  image: StaticImageData;
};

export default ApplicationCard;
