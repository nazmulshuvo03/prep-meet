import { useDispatch, useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../Button";
import { deleteUserData } from "../../../store/middlewares/user";

const Item = ({ label, value, data }) => (
  <div className="flex gap-2 items-start py-0.5">
    <label className="whitespace-nowrap text-sm text-gray-500">{label}:</label>
    <div className="text-sm">
      {typeof value === "object" ? (
        <div className="flex gap-1">
          {value &&
            data &&
            value.length &&
            data.length &&
            value.map((item) => (
              <div key={item}>{getDataLabelFromKey(data, item)},</div>
            ))}
        </div>
      ) : typeof value === "boolean" ? (
        value ? (
          "Yes"
        ) : (
          "No"
        )
      ) : !value || value === "" ? (
        "N/A"
      ) : (
        value
      )}
    </div>
  </div>
);

export const ProfileModal = ({ data, setData }) => {
  const dispatch = useDispatch();
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const preparationStages = useSelector(
    (state) => state.static.preparationStages
  );
  const companies = useSelector((state) => state.static.companies);
  const professions = useSelector((state) => state.profession.items);
  const skills = useSelector((state) => state.profession.allSkill);
  const experienceTypes = useSelector(
    (state) => state.profession.allExperienceType
  );

  const handleDelete = async () => {
    await dispatch(deleteUserData(data.id));
    setData();
  };

  return (
    <div className="p-6 flex gap-4">
      <div className="flex-1">
        <img src={data.photoURL} alt={data.userName} className="w-20 h-20" />
        <Item label={"User ID"} value={data.id} />
        <div className="flex items-center gap-1">
          <Item label={"Email"} value={data.email} />
          {data.email_verified ? (
            <FontAwesomeIcon icon={faCheckCircle} className="!text-green-500" />
          ) : (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="!text-red-500"
            />
          )}
        </div>
        <Item label={"Username"} value={data.userName} />
        <Item label={"Authentication Medium"} value={data.authMedium} />
        <Item label={"Timezone"} value={data.timezone} />
        <Item label={"Unsubscribed"} value={data.unsubscribed} />
        <Button className={"!bg-red-500"} onClick={handleDelete}>
          Delete Account
        </Button>
      </div>
      <div className="flex-1">
        <Item label={"Firstname"} value={data.firstName} />
        <Item label={"Lastname"} value={data.lastName} />
        <Item label={"Country"} value={data.country} />
        <Item
          label={"Target Profession"}
          value={getDataLabelFromKey(professions, data.targetProfessionId)}
        />
        <Item
          label={"Companies of Interest"}
          value={data.companiesOfInterest}
          data={companies}
        />
        <Item
          label={"Level of Experience"}
          value={getDataLabelFromKey(experienceLevels, data.experienceLevel)}
        />
        <Item label={"Focus Areas"} value={data.focusAreas} data={skills} />
        <Item label={"Google Id"} value={data.googleId} />
        <Item
          label={"Stage of Preparation"}
          value={getDataLabelFromKey(preparationStages, data.preparationStage)}
        />
        <Item
          label={"Experience Types"}
          value={data.typesOfExperience}
          data={experienceTypes}
        />
        <Item label={"Profile Headline"} value={data.profileHeadline} />
        <Item label={"LinkedIn Profile"} value={data.linkedInProfile} />
        <Item label={"Created At"} value={data.createdAt} />
      </div>
    </div>
  );
};
