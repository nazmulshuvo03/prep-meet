import { Display } from "../../Profile/InterviewExperience/Display";

export const InterviewExperience = ({ profile }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold uppercase">Interview Experiences</div>
      </div>
      <div className="pt-4 pb-2">
        {profile &&
        profile.interviewExperiences &&
        profile.interviewExperiences.length ? (
          profile.interviewExperiences.map((ie) => {
            return <Display data={ie} key={ie.id} visitMode={true} />;
          })
        ) : (
          <div>Not available</div>
        )}
      </div>
    </div>
  );
};
