import { useSelector } from "react-redux";
import { Dropdown } from "../Dropdown";
import { Input } from "../Input";
import { Button } from "../Button";

export const Experience = ({}) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  const handleChange = () => {};

  const handleAddNewCompany = () => {};

  return (
    <div>
      <div className="py-4">
        <div>Most Recent Educational Degree</div>
        <div className="flex flex-col gap-2">
          <Input
            label="Degree"
            name="degree"
            // value={data.degree}
            onChange={handleChange}
          />
          <Input
            label="Major"
            name="major"
            // value={data.major}
            onChange={handleChange}
          />
          <Input
            label="Institution"
            name="institution"
            // value={data.institution}
            onChange={handleChange}
          />
          <Input
            label="Year of Graduation"
            name="year_of_graduation"
            // value={data.year_of_graduation}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="py-4">
        <div>Most Recent Work Experience</div>
        <div className="flex flex-col gap-2">
          <Dropdown
            name={"jobTitle"}
            // value={jobTitle || ""}
            options={professions}
            onSelect={handleChange}
            label="Job Title"
            allowAddNew={true}
            addNewAction={() => {}}
          />
          <div className="grid grid-cols-2 gap-4">
            <Dropdown
              // label={"Experience Level"}
              name={"companyId"}
              // value={companyId || ""}
              options={companies}
              onSelect={handleChange}
              label="Company"
              allowAddNew={true}
              addNewAction={handleAddNewCompany}
            />
            <Input
              label="Country"
              name="country"
              // value={country}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Start Date"
              name="startDate"
              // value={startDate || ""}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="End Date"
              name="endDate"
              // value={endDate || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="py-4">
        <div>Additional Information</div>
        <Dropdown
          name={"targetProfessionId"}
          // value={targetProfessionId || ""}
          options={professions}
          onSelect={handleChange}
          label="Role of Interest"
          allowAddNew={true}
          addNewAction={() => {}}
        />
      </div>
    </div>
  );
};
