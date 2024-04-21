import { useSelector } from "react-redux";
import { Dropdown } from "../../../Dropdown";

export const Interview = ({ data, handleChange = () => {} }) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const { role, companyId } = data;

  return (
    <>
      <Dropdown
        name={"role"}
        value={role || ""}
        options={professions}
        onSelect={handleChange}
        label="Role"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Dropdown
          name={"companyId"}
          value={companyId || ""}
          options={companies}
          onSelect={handleChange}
          label="Company"
        />
      </div>
    </>
  );
};
