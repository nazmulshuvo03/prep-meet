import { Display } from "./Display";

export const WorkExperience = ({ profile }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="font-semibold uppercase">Experience</div>
      </div>
      <div className="pt-4 pb-2">
        {profile &&
        profile.workExperiences &&
        profile.workExperiences.length ? (
          profile.workExperiences.map((wp) => {
            return <Display data={wp} key={wp.id} />;
          })
        ) : (
          <div>Not available</div>
        )}
      </div>
    </div>
  );
};
