import { useState } from "react";
import { Button } from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { addWorkExperience } from "../../../store/middlewares/workExperience";
import { setToastMessage } from "../../../store/slices/global";
import { TOAST_TYPES } from "../../../constants/Toast";
import { AddNew } from "./AddNew";
import { Display } from "./Display";
import { formatPostgresDate } from "../../../utils/timeDate";

const DEFAULT_DATA = {
  jobTitle: null,
  companyName: null,
  country: "",
  startDate: "",
  endDate: "",
};

export const WorkExperience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [showInput, setShowInput] = useState(false);
  const [formData, setFormData] = useState(DEFAULT_DATA);
  const { jobTitle, companyName, country, startDate, endDate } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    try {
      const formattedStartDate = formatPostgresDate(startDate);
      const formattedEndDate = formatPostgresDate(endDate);

      if (formattedStartDate && formattedEndDate) {
        const fullData = {
          user_id: profile.id,
          profession_id: jobTitle,
          company_name: companyName,
          country: country,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        };
        dispatch(addWorkExperience(fullData));
        setShowInput(false);
        setFormData(DEFAULT_DATA);
      }
    } catch (err) {
      dispatch(setToastMessage({ type: TOAST_TYPES[1], message: err.message }));
    }
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
