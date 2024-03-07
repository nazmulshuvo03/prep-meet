import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { Target } from "./Target";

export const Info = ({ profile }) => {
  return (
    <div className="bg-white p-5 h-full w-full">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 px-5">
          <div className="flex flex-col items-center">
            <img
              src={profile.photoURL}
              alt={"Person Profile Image"}
              className="h-32 w-32 rounded-md"
            />
            <div className="flex gap-2 font-semibold text-md">
              <span>{profile.firstName}</span>
              <span>{profile.lastName}</span>
            </div>
            <div className="text-sm font-light text-gray-500">
              {profile.country}
            </div>
          </div>
          <div className="pt-5">
            {profile.email ? (
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="text-xs text-gray-500"
                  icon={faEnvelope}
                />
                <div className="text-md text-gray-500">{profile.email}</div>
              </div>
            ) : (
              ""
            )}
            {profile.targetProfession && profile.targetProfession.name ? (
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="text-xs text-gray-500"
                  icon={faBriefcase}
                />
                <div className="text-md text-gray-500">
                  {profile.targetProfession.name}
                </div>
              </div>
            ) : (
              ""
            )}
            {profile.userName ? (
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="text-xs text-gray-500"
                  icon={faEnvelope}
                />
                <div className="text-md text-gray-500">{profile.userName}</div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Target profile={profile} />
      </div>
      <div className="flex gap-2 justify-end text-xs font-bold mt-4">
        <div>cancelation: N/A</div>
        <div>depth of feedback: N/A</div>
        <div>product sense: N/A</div>
        <div>analytics and metrics: N/A</div>
        <div>behavioral: N/A</div>
      </div>
    </div>
  );
};
