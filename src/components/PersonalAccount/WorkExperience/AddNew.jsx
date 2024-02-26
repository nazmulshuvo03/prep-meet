import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";
import { Input } from "../../Input";
import { addCompany } from "../../../store/middlewares/static";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  const dispatch = useDispatch();
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const { jobTitle, companyId, country, startDate, endDate } = data;

  const handleAddNewCompany = (data) => {
    dispatch(addCompany(data));
  };

  return (
    <div className="flex flex-col gap-2">
      <Dropdown
        name={"jobTitle"}
        value={jobTitle || ""}
        options={professions}
        onSelect={handleChange}
        defaultText="Job Title"
        allowAddNew={true}
        addNewAction={() => {}}
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          // label={"Experience Level"}
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
        <Input
          type="date"
          placeholder="Start Date"
          name="startDate"
          value={startDate || ""}
          onChange={handleChange}
        />
        <Input
          type="date"
          placeholder="End Date"
          name="endDate"
          value={endDate || ""}
          onChange={handleChange}
        />
      </div>
      <Button className={"!bg-accent"} onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};
