import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faPen } from "@fortawesome/free-solid-svg-icons";
import { faCopy as faCopied } from "@fortawesome/free-regular-svg-icons";
import { IconButton } from "../../Button/IconButton";
import { Modal } from "../../Modal";
import { useState } from "react";
import { EditTarget } from "./EditTarget";
import { TargetItem } from "./TargetItem";
import { Tooltip } from "../../Tooltip";
import { config } from "../../../../.config";

export const Target = ({ visit = false }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const formattedURL = `${config.FRONTEND_URL}/user/${profile.id}`;
    navigator.clipboard
      .writeText(formattedURL)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="relative flex-1 flex flex-col gap-2 pt-4">
      <div className="flex flex-col gap-2 mb-4">
        <TargetItem
          title="Target Company"
          valueArray={profile.companiesOfInterest}
          optionArray={companies}
          size="big"
          tooltip={true}
        />
        <TargetItem
          title="Target Role"
          value={
            profile && profile.targetProfession
              ? profile.targetProfession.name || ""
              : ""
          }
        />
        <TargetItem
          title="Target Level"
          value={
            profile && profile.experienceLevel
              ? getDataLabelFromKey(
                  experienceLevels,
                  profile.experienceLevel
                ) || ""
              : ""
          }
        />
        <TargetItem
          title="Stage of Interviewing"
          value={
            profile && profile.preparationStage
              ? getDataLabelFromKey(
                  preparationStages,
                  profile.preparationStage
                ) || ""
              : ""
          }
        />
        <TargetItem
          title="Focus Area"
          valueArray={profile.focusAreas}
          optionArray={allSkill}
        />
        <TargetItem
          title="Experience Types"
          valueArray={profile.typesOfExperience}
          optionArray={allExperienceType}
        />
      </div>

      {profile.profileHeadline && profile.profileHeadline.length ? (
        <div className="h-full">
          <div className="text-sm font-normal text-text py-2 h-full">
            {profile.profileHeadline}
          </div>
        </div>
      ) : (
        <div />
      )}

      {!visit ? (
        <div className="absolute top-0 right-0 flex gap-4">
          <IconButton onClick={handleCopy}>
            <Tooltip text="Copy Profile Address">
              <FontAwesomeIcon
                icon={copied ? faCopied : faCopy}
                className={`text-gray-600 md:text-md`}
              />
            </Tooltip>
          </IconButton>
          <IconButton onClick={() => setEditMode(true)}>
            <Tooltip text="Edit Profile">
              <FontAwesomeIcon
                icon={faPen}
                className="text-gray-600 md:text-md"
              />
            </Tooltip>
          </IconButton>
        </div>
      ) : (
        <></>
      )}
      {editMode && (
        <Modal className="!w-11/12 !md:w-2/3 !h-4/5">
          <EditTarget
            handleDone={() => setEditMode(false)}
            handleClose={() => setEditMode(false)}
          />
        </Modal>
      )}
    </div>
  );
};
