import { useSelector } from "react-redux";
import { companyNameShortner } from "../../../utils/string";
import { getDataLabelFromKey } from "../../../utils/data";
import { TextInput } from "../../TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { UserName } from "./UserName";
import { Target } from "./Target";

export const Info = () => {
  const profile = useSelector((state) => state.user.profile);
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const allSkill = useSelector((state) => state.profession.allSkill);
  const allExperienceType = useSelector(
    (state) => state.profession.allExperienceType
  );

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
            <UserName />
          </div>
        </div>
        <Target />
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
