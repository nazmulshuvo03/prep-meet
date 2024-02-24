import { Button } from "../../Button";
import { Input } from "../../Input";

export const AddNew = ({
  data,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Degree"
          name="degree"
          value={data.degree}
          onChange={handleChange}
        />
        <Input
          placeholder="Major"
          name="major"
          value={data.major}
          onChange={handleChange}
        />
        <Input
          placeholder="Institution"
          name="institution"
          value={data.institution}
          onChange={handleChange}
        />
        <Input
          placeholder="Year of Graduation"
          name="year_of_graduation"
          value={data.year_of_graduation}
          onChange={handleChange}
        />
      </div>
      <Button className={"!bg-accent"} onClick={handleSubmit}>
        Save
      </Button>
    </div>
  );
};
