import ApplicationCard from "@/components/ui/application-card";
import { links } from "@/lib/data";
import React from "react";
const AppLinks = () => {
  const applications = links.filter((item) => item.title === "Kinematics")[0]
    .subRoutes!;
  return (
    <div>
      {applications.map((app) => (
        <React.Fragment key={app.title}>
          <ApplicationCard {...app} alt={app.description} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default AppLinks;
