import { useSelector } from "react-redux";
import { companyNameShortner } from "../../utils/string";
import { getDataLabelFromKey } from "../../utils/data";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../utils/timeDate";
import { useEffect, useState } from "react";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";
import { TextInput } from "../TextInput";

export const Info = () => {
  const profile = useSelector((state) => state.user.profile);
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );

  return (
    <div className="bg-white p-3 h-full w-full">
      <div className="flex gap-5">
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
        <div className="flex-1 flex flex-col gap-2">
          <div>
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
              <div className="text-xs font-semibold">Target Role:</div>
              <div className="text-xs font-medium">
                {profile && profile.targetProfession
                  ? profile.targetProfession.name || ""
                  : ""}
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
              <div className="flex gap-1 flex-wrap break-words text-xs font-semibold">
                {profile.focusAreas &&
                  profile.focusAreas.length &&
                  profile.focusAreas.map((focus, i) => {
                    return (
                      <div key={focus}>
                        <span>{getDataLabelFromKey(companies, focus)}</span>
                        {i < profile.focusAreas.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="flex flex-wrap items-baseline gap-1 break-words">
              <div className="text-xs font-semibold">Experience Types:</div>
              <div className="flex gap-1 flex-wrap break-words text-xs font-semibold">
                {profile.typesOfExperience &&
                  profile.typesOfExperience.length &&
                  profile.typesOfExperience.map((types, i) => {
                    return (
                      <div key={types}>
                        <span>{getDataLabelFromKey(companies, types)}</span>
                        {i < profile.typesOfExperience.length - 1 ? (
                          <span>,</span>
                        ) : (
                          <span />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex gap-1 border p-1">
            <ProfileCardCapsul className="bg-purple-200 text-purple-800">
              Chip 1
            </ProfileCardCapsul>
            <ProfileCardCapsul className="bg-purple-200 text-purple-800">
              Chip 2
            </ProfileCardCapsul>
          </div>
          <TextInput
            // label="Bio"
            name={"profileHeadline"}
            placeholder={"Write the headline of your profile"}
            rows="3"
            // value={state.profileHeadline}
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
