import React from "react";
import CreateProject from "../components/CreateProject";

interface CreateProjectPageProps {
  addProjectToList: (project: any) => void; // Define the type of addProjectToList function
}

const CreateProjectPage: React.FC<CreateProjectPageProps> = ({
  addProjectToList,
}) => {
  return (
    <div>
      <div className="mt-6 flex-grow">
        <CreateProject addProjectToList={addProjectToList} />
      </div>
    </div>
  );
};

export default CreateProjectPage;
