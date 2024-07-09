import ContactButton from "@/app/(home)/_components/ContactButton";
import ContactForm from "@/app/(home)/_components/ContactForm";
import CardWrapper from "@/components/ui/cardWrapper";

const Contact = () => {
  return (
    <section className="p-0 py-12 container lg:py-24 flex flex-col items-center lg:flex-row gap-y-32 lg:justify-around">
      <div className="lg:w-[400px]">
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>
        <div className="w-full flex flex-col items-center gap-y-6 mt-6">
          <p className="w-full text-muted-foreground text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex gap-4">
            <ContactButton>Email us</ContactButton>
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/5 lg:w-2/5">
        <CardWrapper className="rounded-none md:rounded-md lg:rounded-lg shadow-sm lg:shadow">
          <ContactForm />
        </CardWrapper>
      </div>
    </section>
  );
};

export default Contact;
