import React from "react";

const ContactButton = ({ children }: ContactButtonProps) => {
  const contactMail = process.env.DEVELOPER_EMAIL;
  return <a href={`mailto:${contactMail}`}> {children} </a>;
};

export default ContactButton;

type ContactButtonProps = {
  children: React.ReactNode;
};
