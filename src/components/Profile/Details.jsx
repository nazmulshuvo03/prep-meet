import { Education } from "./Education";
import { WorkExperience } from "./WorkExperience";

export const Details = ({ data }) => {
  return (
    <div className="bg-white p-3 flex flex-col gap-3">
      <WorkExperience />
      <Education />
    </div>
  );
};
