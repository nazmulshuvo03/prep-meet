import { useHistory } from "react-router-dom";
import { Button } from "../Button";
import { getDateDescription } from "../../utils/timeDate";

export const ActionArea = ({ data = null }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/user/${data.id}`);
  };

  return (
    <div className="flex justify-end">
      <div className="flex gap-3 items-center">
        <Button className="bg-transparent !text-green-600 text-xs !font-semibold uppercase !py-1 !px-0">
          Last Practiced X days age
        </Button>
        <Button
          onClick={handleClick}
          className="bg-white !text-gray-700 !font-bold border border-gray-700 text-xs !py-1 !px-2"
        >
          Learn More
        </Button>
        <Button className="!bg-secondary border border-secondary text-xs !py-1 !px-16">
          Next Available {getDateDescription(data.availabilities[0]?.dayHour)}
        </Button>
      </div>
    </div>
  );
};
