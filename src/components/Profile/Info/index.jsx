import { useSelector } from "react-redux";
import { companyNameShortner } from "../../../utils/string";
import { getDataLabelFromKey } from "../../../utils/data";
import { TextInput } from "../../TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { UserName } from "./UserName";

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
        <div className="col-span-8 flex flex-col gap-2">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-wrap items-baseline gap-1 break-words">
              <div className="text-sm font-semibold">Target Company:</div>
              <div className="flex gap-1 flex-wrap break-words text-xs font-semibold">
                {profile.companiesOfInterest &&
                  profile.companiesOfInterest.length &&
                  profile.companiesOfInterest.map((comp, i) => {
                    return (
                      <div key={comp}>
                        <span>
                          {companyNameShortner(
                            getDataLabelFromKey(companies, comp),
                            2
                          )}
                        </span>
                        {i < profile.companiesOfInterest.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex gap-1 items-baseline">
              <div className="text-xs font-semibold">Target Level:</div>
              <div className="text-xs font-medium">
                {profile && profile.experienceLevel
                  ? getDataLabelFromKey(
                      experienceLevels,
                      profile.experienceLevel
                    ) || ""
                  : ""}
              </div>
            </div>

            <div className="flex gap-1 items-baseline">
              <div className="text-xs font-semibold">
                Stage of Interviewing:
              </div>
              <div className="text-xs font-medium">
                {profile && profile.preparationStage
                  ? getDataLabelFromKey(
                      preparationStages,
                      profile.preparationStage
                    ) || ""
                  : ""}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-1 break-words">
              <div className="text-xs font-semibold">Focus Areas:</div>
              <div className="flex gap-1 flex-wrap break-words text-xs font-normal">
                {profile.focusAreas &&
                  profile.focusAreas.length &&
                  profile.focusAreas.map((focus, i) => {
                    return (
                      <div key={focus}>
                        <span className="bg-purple-100 text-purple-800 px-4 py-0.5 rounded-full">
                          {getDataLabelFromKey(allSkill, focus)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-1 break-words">
              <div className="text-xs font-semibold">Experience Types:</div>
              <div className="flex gap-1 flex-wrap break-words text-xs font-normal">
                {profile.typesOfExperience &&
                  profile.typesOfExperience.length &&
                  profile.typesOfExperience.map((types, i) => {
                    return (
                      <div key={types}>
                        <span className="bg-blue-100 text-blue-800 px-4 py-0.5 rounded-full">
                          {getDataLabelFromKey(allExperienceType, types)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <TextInput
            // label="Bio"
            name={"profileHeadline"}
            placeholder={"Write the headline of your profile"}
            rows="3"
            value={profile.profileHeadline || ""}
            // setValue={handleChange}
          />
        </div>
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
