import { Education } from "./Education";
import { InterviewExperience } from "./InterviewExperience";
import { WorkExperience } from "./WorkExperience";

export const Details = ({ profile }) => {
  return (
    <div className="bg-white p-3 h-full w-full overflow-y-auto flex flex-col gap-3">
      <WorkExperience profile={profile} />
      <Education profile={profile} />
      <InterviewExperience profile={profile} />
    </div>
  );
};
