import { Education } from "./Education";
import { InterviewExperience } from "./InterviewExperience";
import { WorkExperience } from "./WorkExperience";

export const Details = () => {
  return (
    <div className="bg-white p-3 h-full w-full overflow-y-auto flex flex-col gap-3">
      <WorkExperience />
      <Education />
      <InterviewExperience />
    </div>
  );
};
