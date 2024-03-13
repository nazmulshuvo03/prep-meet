import { useDispatch, useSelector } from "react-redux";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { Button } from "../../Button";
import { createMeeting } from "../../../store/middlewares/meeting";

export const CreateMeeting = ({ profile, data, handleCancel = () => {} }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  const handleConfirm = async () => {
    const payload = {
      availabilityId: data.id,
      acceptorId: user.id,
    };
    await dispatch(createMeeting(payload));
    handleCancel();
  };

  return (
    <div className="text-center p-6">
      <div className="text-lg text-gray-500 pb-4">Are you sure?</div>
      <div className="text-xs text-gray-500">You want to create meeting at</div>
      <div className="text-lg text-text font-semibold pb-1">
        {convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC).dateMonthView}
        {", "}
        {convertISOUTCDayTimeToLocalDayTime(data.dayHourUTC).time}
      </div>
      <div className="text-xs text-gray-500">
        with{" "}
        <span className="text-lg text-text font-semibold">
          {profile.userName}
        </span>
      </div>
      <div className="flex justify-between pt-4">
        <Button size="small" className={"!bg-red-400"} onClick={handleCancel}>
          Cancel
        </Button>
        <Button size="small" className={"bg-green-400"} onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
};
