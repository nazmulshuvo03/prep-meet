import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addWorkExperience } from "../../../store/middlewares/workExperience";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { formatPostgresDate } from "../../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";

const DEFAULT_DATA = {
  jobTitle: null,
  companyId: null,
  country: "",
  startDate: null,
  endDate: null,
};

export const WorkExperience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { jobTitle, experienceId, companyId, country, startDate, endDate } =
    formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const formattedStartDate = formatPostgresDate(startDate);
    const formattedEndDate = formatPostgresDate(endDate);

    const fullData = {
      user_id: profile.id,
      jobTitle: jobTitle,
      experienceId: experienceId,
      companyId: companyId,
      country: country,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };
    dispatch(addWorkExperience(fullData));
    setShowInput(false);
    setFormData(DEFAULT_DATA);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="font-semibold uppercase">Experience</div>
        {profile.workExperiences && profile.workExperiences.length > 0 ? ( // If there is no data added, input fields will be open by default
          <Button
            className="!bg-transparent !text-gray-500 !p-0 text-2xl"
            onClick={() => setShowInput((prev) => !prev)}
          >
            {showInput ? (
              <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </Button>
        ) : (
          <div />
        )}
      </div>
      <div className="pt-4 pb-2">
        {profile &&
        profile.workExperiences &&
        profile.workExperiences.length ? (
          profile.workExperiences.map((wp) => {
            return <Display data={wp} key={wp.id} />;
          })
        ) : (
          <AddNew
            data={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      {showInput && (
        <AddNew
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
