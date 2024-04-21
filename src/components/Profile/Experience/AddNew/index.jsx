import { Button } from "../../../Button";
import { Work } from "./Work";
import { Education } from "./Education";
import { Interview } from "./Interview";

export const AddNew = ({
  data,
  title,
  handleChange = () => {},
  handleSubmit = () => {},
}) => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      {title === "Work Experience" ? (
        <Work data={data} handleChange={handleChange} />
      ) : title === "Education" ? (
        <Education data={data} handleChange={handleChange} />
      ) : title === "Interview Experience" ? (
        <Interview data={data} handleChange={handleChange} />
      ) : (
        <div />
      )}
      <div className="flex justify-center mt-auto">
        <Button size="small" className={"!bg-secondary"} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
