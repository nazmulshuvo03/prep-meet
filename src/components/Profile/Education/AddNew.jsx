import { Button } from "../../Button";
import { Input } from "../../Input";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Degree"
          name="degree"
          value={data.degree}
          onChange={handleChange}
        />
        <Input
          label="Major"
          name="major"
          value={data.major}
          onChange={handleChange}
        />
        <Input
          label="Institution"
          name="institution"
          value={data.institution}
          onChange={handleChange}
        />
        <Input
          label="Year of Graduation"
          name="year_of_graduation"
          value={data.year_of_graduation}
          onChange={handleChange}
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
