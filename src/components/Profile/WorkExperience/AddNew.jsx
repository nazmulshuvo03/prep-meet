import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Input } from "../../Input";
import { addCompany } from "../../../store/middlewares/static";
import { DateInput } from "../../Input/DateInput";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const companies = useSelector((state) => state.static.companies);
  const { jobTitle, experienceId, companyId, country, startDate, endDate } =
    data;

  const handleAddNewCompany = (data) => {
    dispatch(addCompany(data));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Role"
          name="jobTitle"
          value={jobTitle || ""}
          onChange={handleChange}
        />
        <Dropdown
          name={"experienceId"}
          value={experienceId || ""}
          options={experienceLevels}
          onSelect={handleChange}
          defaultText="Experience Level"
        />
        <Dropdown
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          defaultText="Company"
          allowAddNew={true}
          addNewAction={handleAddNewCompany}
        />
        <Input
          placeholder="Country"
          name="country"
          value={country}
          onChange={handleChange}
        />
        <DateInput
          label={"From"}
          value={startDate || ""}
          onChange={(value) => {
            handleChange({
              target: {
                name: "startDate",
                value,
              },
            });
          }}
        />
        <DateInput
          label={"To"}
          placeholder={"Present"}
          value={endDate || ""}
          onChange={(value) => {
            handleChange({
              target: {
                name: "endDate",
                value,
              },
            });
          }}
        />
      </div>
      <div className="flex justify-end">
        <Button size="small" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
