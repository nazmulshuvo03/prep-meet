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
  console.log("!!!!!!", data);
  return (
    <div className="p-4">
      <div className="mb-2">
        <div className="text-center text-3xl font-medium text-zinc-600">
          Schedule meet
        </div>
        <div className="text-center text-sm font-normal text-zinc-400">
          with
        </div>
        <div className="text-center text-2xl font-semibold text-accent">
          {data.acceptor.firstName} {data.acceptor.lastName}
        </div>
        <div className="text-secondary text-center">
          <FontAwesomeIcon icon={faCalendarDay} />{" "}
          <span>{formatHourWithAMPM(data.availability.time)}</span>{" "}
          <span>
            {getFormattedDateWithWeekday(
              new Date(parseInt(data.availability.day))
            )}
          </span>
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
