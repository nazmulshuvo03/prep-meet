import { useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { addWorkExperience } from "../../store/middlewares/userInfo";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";

export const WorkExperience = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const professionDropdownOptions = useSelector(
    (state) => state.profession.professionKeyPairs
  );

  const [formData, setFormData] = useState({
    jobTitle: null,
    companyName: null,
    country: "",
    startDate: "",
    endDate: "",
  });
  const { jobTitle, companyName, country, startDate, endDate } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formatPostgresDate = (date) => {
    try {
      const parsedDate = new Date(date);
      return parsedDate.toISOString();
    } catch (err) {
      dispatch(setToastMessage({ type: TOAST_TYPES[1], message: err.message }));
    }
  };

  const handleSubmit = () => {
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
    }
  };

  console.log("Work experience data: ", profile, formData);
  return (
    <div className="flex flex-col gap-2">
      <div>Work Experience</div>
      <Dropdown
        // label={"Job Title"}
        name={"jobTitle"}
        value={jobTitle || ""}
        options={professionDropdownOptions}
        onSelect={handleChange}
        defaultText="Job Title"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Company Name"
          name="companyName"
          value={companyName || ""}
          onChange={handleChange}
        />
        <Input
          placeholder="Country"
          name="country"
          value={country}
          onChange={handleChange}
        />
        <Input
          type="date"
          placeholder="Start Date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
        />
        <Input
          type="date"
          placeholder="End Date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
        />
      </div>
      <Button className={"!bg-accent"} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
