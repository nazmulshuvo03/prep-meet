import { useSelector } from "react-redux";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../../utils/timeDate";
import { getDataLabelFromKey } from "../../../utils/data";

export const Display = ({ data }) => {
  const professions = useSelector((state) => state.profession.items);
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
        <div className="flex items-center justify-between text-sm font-semibold">
          {getDataLabelFromKey(companies, data.companyId)}
        </div>
        <div className="text-sm font-medium">
          {getDataLabelFromKey(professions, data.professionId)}
        </div>
        <div className="text-sm font-medium">{data.country}</div>
        <div className="flex gap-1 items-center text-xs font-normal text-gray-500">
          <span>
            {convertISOUTCDayTimeToLocalDayTime(data.startDate).date}
            {" - "}
            {data.endDate
              ? convertISOUTCDayTimeToLocalDayTime(data.endDate).date
              : "Present"}
          </span>
          <span style={{ fontSize: 30 }}>&middot;</span>
          <span>{timeDistance(data.startDate, data.endDate)}</span>
        </div>
      </div>
    </div>
  );
};
