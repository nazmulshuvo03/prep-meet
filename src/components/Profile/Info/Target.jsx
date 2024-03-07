import { useSelector } from "react-redux";
import { companyNameShortner } from "../../../utils/string";
import { getDataLabelFromKey } from "../../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../Button/IconButton";
import { Modal } from "../../Modal";
import { useState } from "react";
import { EditTarget } from "./EditTarget";

export const Target = () => {
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
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="relative col-span-8 flex flex-col gap-2">
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
          <div className="text-xs font-semibold">Stage of Interviewing:</div>
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
      {profile.profileHeadline && profile.profileHeadline.length && (
        <div className="h-full">
          <div className="text-sm font-normal text-gray-600 border border-gray-200 p-2 h-full">
            {profile.profileHeadline}
          </div>
        </div>
      )}
      <div className="absolute top-0 right-0">
        <IconButton onClick={() => setEditMode(true)}>
          <FontAwesomeIcon icon={faPen} className="text-gray-600 text-xl" />
        </IconButton>
      </div>
      {editMode && (
        <Modal handleClose={() => setEditMode(false)}>
          <EditTarget handleDone={() => setEditMode(false)} />
        </Modal>
      )}
    </div>
  );
};
