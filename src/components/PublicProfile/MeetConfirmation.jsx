import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../Button";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import {
  formatHourWithAMPM,
  getFormattedDateWithWeekday,
} from "../../utils/TimeDate";

export const MeetConfirmation = ({
  data,
  handleClose = () => {},
  handleConfirm = () => {},
}) => {
  return (
    <div className="p-4">
      <div className="mb-2">
        <div className="text-center text-3xl font-medium text-zinc-600">
          Request meet
        </div>
        <div className="text-center text-sm font-normal text-zinc-400">
          with
        </div>
        <div className="text-center text-2xl font-semibold text-accent">
          {data.firstName} {data.lastName}
        </div>
        <div className="text-secondary text-center">
          <FontAwesomeIcon icon={faCalendarDay} />{" "}
          <span>{formatHourWithAMPM(data.time)}</span>{" "}
          <span>{getFormattedDateWithWeekday(new Date(data.date))}</span>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <Button onClick={handleClose} className="bg-red-500">
          Cancel
        </Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
};
