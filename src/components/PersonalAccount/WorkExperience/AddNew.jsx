import { useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Input } from "../../Input";

export const AddWorkExperience = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  const professionDropdownOptions = useSelector(
    (state) => state.profession.professionKeyPairs
  );
  const { jobTitle, companyName, country, startDate, endDate } = data;

  return (
    <div className="flex flex-col gap-2">
      <Dropdown
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
        Add
      </Button>
    </div>
  );
};
