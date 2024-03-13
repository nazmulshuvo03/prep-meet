import { useSelector } from "react-redux";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../../utils/timeDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getDataLabelFromKey } from "../../../utils/data";

export const Display = ({
  data,
  handleEditClick = () => {},
  handleDeleteClick = () => {},
  visit = false,
}) => {
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="px-2 relative pb-3 flex justify-between items-start">
      <div>
        <div
          className="border-l-2 border-gray-200 absolute"
          style={{ height: "100%", top: 10, left: -2 }}
        />
        <div
          className="text-gray-300 absolute"
          style={{ fontSize: 30, top: -11, left: -5 }}
        >
          &middot;
        </div>
        <div className="flex items-center justify-between text-md font-semibold">
          {getDataLabelFromKey(companies, data.companyId)}
        </div>
        <div className="flex gap-1 items-center text-sm font-medium">
          <span>{data.jobTitle}</span>
          <span style={{ fontSize: 20 }}>&middot;</span>
          <span className="italic">
            {getDataLabelFromKey(experienceLevels, data.experienceId)}
          </span>
        </div>
        <div className="text-sm font-medium text-gray-500">{data.country}</div>
        <div className="flex gap-1 items-center text-xs font-normal text-gray-500">
          <span>
            {convertISOUTCDayTimeToLocalDayTime(data.startDate).date}
            {" - "}
            {data.endDate
              ? convertISOUTCDayTimeToLocalDayTime(data.endDate).date
              : "Present"}
          </span>
          <span style={{ fontSize: 20 }}>&middot;</span>
          <span>{timeDistance(data.startDate, data.endDate)}</span>
        </div>
      </div>
      {!visit ? (
        <div className="flex gap-2 text-xs">
          <div
            className="cursor-pointer"
            onClick={() => handleEditClick(data.id)}
          >
            <FontAwesomeIcon icon={faEdit} className="text-gray-400" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleDeleteClick(data.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="text-gray-400" />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
