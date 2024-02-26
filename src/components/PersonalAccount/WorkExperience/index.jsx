import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addWorkExperience } from "../../../store/middlewares/workExperience";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { formatPostgresDate } from "../../../utils/timeDate";

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
  const { jobTitle, companyId, country, startDate, endDate } = formData;

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
      professionId: jobTitle,
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>Work Experiences</div>
        {profile.workExperiences && profile.workExperiences.length > 0 ? ( // If there is no data added, input fields will be open by default
          <Button onClick={() => setShowInput((prev) => !prev)}>
            {showInput ? "Close" : "Add More"}
          </Button>
        ) : (
          <div />
        )}
      </div>
      {profile && profile.workExperiences && profile.workExperiences.length ? (
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
