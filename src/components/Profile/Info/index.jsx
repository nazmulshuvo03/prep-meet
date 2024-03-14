import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { UserName } from "./UserName";
import { Target } from "./Target";
import { AdditionalInfo } from "../../PersonCard/AdditionalInfo";

export const Info = ({ visit = false }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  return (
    <div className="bg-white p-2 h-full w-full flex flex-col">
      <div className="flex-1 p-2">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-4 px-4">
            <div className="flex items-center justify-start">
              <div className="flex flex-col items-center">
                <img
                  src={profile.photoURL}
                  alt={"Person Profile Image"}
                  className="h-32 w-32 rounded-md my-2"
                />
                <div className="flex gap-2 font-semibold text-lg">
                  <span>{profile.firstName}</span>
                  <span>{profile.lastName}</span>
                </div>
                <div className="text-sm font-normal text-gray-500">
                  {profile.country}
                </div>
              </div>
            </div>
            <div className="pt-5">
              {!visit && profile.email ? (
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
              <UserName visit={visit} />
            </div>
          </div>
          <Target visit={visit} />
        </div>
      </div>
      <div className="flex justify-end items-center mt-4">
        <AdditionalInfo visit={visit} />
      </div>
    </div>
  );
};
