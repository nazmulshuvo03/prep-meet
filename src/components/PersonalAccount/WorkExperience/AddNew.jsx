import { useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Input } from "../../Input";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const { jobTitle, companyId, country, startDate, endDate } = data;

  return (
    <div className="flex flex-col gap-2">
      <Dropdown
        name={"jobTitle"}
        value={jobTitle || ""}
        options={professions}
        onSelect={handleChange}
        defaultText="Job Title"
      />
      <div className="grid grid-cols-2 gap-4">
        {/* <Input
          placeholder="Company Name"
          name="companyId"
          value={companyId || ""}
          onChange={handleChange}
        /> */}
        <Dropdown
          // label={"Experience Level"}
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          defaultText="Company"
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
        Save
      </Button>
    </div>
  );
};
