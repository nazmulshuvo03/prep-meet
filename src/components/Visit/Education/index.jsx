import { useSelector } from "react-redux";
import { Display } from "./Display";

export const Education = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="font-semibold uppercase">Education</div>
      </div>
      <div className="pt-4 pb-2">
        {profile && profile.education && profile.education.length ? (
          profile.education.map((ed) => {
            return <Display data={ed} key={ed.id} />;
          })
        ) : (
          <div>Not available</div>
        )}
      </div>
    </div>
  );
};
