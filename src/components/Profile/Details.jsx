import { Education } from "./Education";
import { InterviewExperience } from "./InterviewExperience";
import { WorkExperience } from "./WorkExperience";

export const Details = ({ visit = false }) => {
  return (
    <div className="bg-white p-3 h-full w-full overflow-y-auto flex flex-col gap-3">
      <WorkExperience visit={visit} />
      <Education visit={visit} />
      <InterviewExperience visit={visit} />
    </div>
  );
};
