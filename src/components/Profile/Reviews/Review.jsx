import { useSelector } from "react-redux";
import { getDataLabelFromKey } from "../../../utils/data";
import { companyNameShortner } from "../../../utils/string";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";
import { Stars } from "../../Stars";

export const Review = ({ data }) => {
  const companies = useSelector((state) => state.static.companies);

  return (
    <div className="flex gap-3 bg-white p-2 rounded my-2">
      <img
        src={data.reviewerProfile.photoURL}
        alt="Reviewer Image"
        className="h-16 w-16"
      />
      <div>
        <div className="flex items-baseline gap-1 mb-2">
          <div className="font-bold text-lg">
            {data.reviewerProfile.userName}
          </div>
          {data.reviewerProfile.workExperiences &&
            data.reviewerProfile.workExperiences.length && (
              <div className="text-xs font-medium italic">
                {data.reviewerProfile.workExperiences[0].jobTitle}
                {","}
              </div>
            )}
          {data.reviewerProfile.workExperiences &&
            data.reviewerProfile.workExperiences.length && (
              <div className="text-xs font-medium italic">
                {companyNameShortner(
                  getDataLabelFromKey(
                    companies,
                    data.reviewerProfile.workExperiences[0].companyId
                  ),
                  2
                )}
              </div>
            )}
        </div>
        <div className="text-sm text-gray-500 mb-1">
          <span>Interview Date: </span>
          <span>
            {
              convertISOUTCDayTimeToLocalDayTime(data.meeting.dayHourUTC)
                .dateMonthView
            }
          </span>
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Punctuality: <Stars color="blue" value={data.punctuality} />
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Preparedness: <Stars color="blue" value={data.preparedness} />
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-500">
          Feedback: <Stars color="blue" value={data.depthOfFeedback} />
        </div>
      </div>
    </div>
  );
};
