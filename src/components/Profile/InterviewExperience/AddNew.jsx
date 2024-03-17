import { useSelector } from "react-redux";
import { Button } from "../../Button";
import { Dropdown } from "../../Dropdown";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const { role, companyId } = data;

  return (
    <div className="flex-1 flex flex-col gap-2">
      <Dropdown
        name={"role"}
        value={role || ""}
        options={professions}
        onSelect={handleChange}
        label="Role"
      />
      <div className="grid grid-cols-2 gap-4">
        <Dropdown
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          label="Company"
        />
      </div>
      <div className="flex justify-center mt-auto">
        <Button size="small" className={"!bg-secondary"} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
