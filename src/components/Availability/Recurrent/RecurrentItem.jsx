import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDataLabelFromKey } from "../../../utils/data";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const RecurrentItem = ({ data, dayIndexes, hourIndexes }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary text-white w-fit rounded-md px-4 py-1 cursor-pointer">
      <div className="flex gap-1 text-sm">
        <span>{getDataLabelFromKey(dayIndexes, data.weekday)}</span>
        <span>{getDataLabelFromKey(hourIndexes, data.hour + 1)}</span>
      </div>
      <FontAwesomeIcon icon={faClose} />
    </div>
  );
};
