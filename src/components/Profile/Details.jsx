import { Education } from "./Education";
import { InterviewExperience } from "./InterviewExperience";
import { WorkExperience } from "./WorkExperience";

export const Details = ({ visit = false }) => {
  return (
    <div className="bg-white p-3 h-fit w-full flex flex-col gap-3 shadow-md">
      <WorkExperience visit={visit} />
      <Education visit={visit} />
      <InterviewExperience visit={visit} />
    </div>
  );
};
