import React from "react";
import Navigation from "../components/Navigation";
import ProjectNameImmutable from "../components/ProjectNameImmutable";
import ProjectDate from "../components/ProjectDate";
import ProjectOverview from "../components/ProjectOverview";
import ProjectMembers from "../components/ProjectMembers";
import ProjectName from "../components/ProjectName";

const CreateProjectPage: React.FC = () => {
  return (
    <div className="container mx-auto bg-slate-100 pb-4">
      <Navigation />
      <div className="mt-6 flex-grow">
        {/* <ProjectNameImmutable /> */}
        <ProjectName />
        <ProjectDate />
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 pr-4">
            <ProjectOverview />
          </div>
          <div className="lg:w-1/3 pl-8">
            <ProjectMembers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
