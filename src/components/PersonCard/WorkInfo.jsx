import { useSelector } from "react-redux";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";
import { companyNameShortner } from "../../utils/string";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";
import { AdditionalInfo } from "./AdditionalInfo";

const Current = ({ data, companies, experienceLevels }) => (
  <div className="text-text">
    <div className="text-base font-semibold">
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div className="text-sm font-medium flex gap-1">
      <div>{data.jobTitle}</div>
      {data.experienceId ? (
        <>
          <div style={{ fontSize: 30 }}>&middot;</div>
          <div className="italic">
            {getDataLabelFromKey(experienceLevels, data.experienceId)}
          </div>
        </>
      ) : (
        <div />
      )}
    </div>
    <div className="flex gap-1 text-gray-600 text-xs">
      <div>
        {convertISOUTCDayTimeToLocalDayTime(data.startDate).dateMonthView} -
        Present
      </div>
      <div style={{ fontSize: 30 }}>&middot;</div>
      <div>{timeDistance(data.startDate, data.endDate)}</div>
    </div>
  </div>
);

const Other = ({ data, companies, experienceLevels }) => (
  <div className="flex items-center gap-1 py-1 text-gray-600">
    <div className="text-sm">
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div style={{ fontSize: 30 }}>&middot;</div>
    <div className="flex gap-1 text-xs items-baseline">
      <div>{data.jobTitle ? `${data.jobTitle},` : ""}</div>
      <div>
        {data.experienceId
          ? `${getDataLabelFromKey(experienceLevels, data.experienceId)}`
          : ""}
      </div>
      {/* <div>
        {data.endDate ? `${timeDistance(data.startDate, data.endDate)}` : ""}
      </div> */}
    </div>
  </div>
);

export const WorkInfo = ({ data = null }) => {
  const companies = useSelector((state) => state.static.companies);
  const experienceLevels = useSelector(
    (state) => state.static.experienceLevels
  );

  return (
    <>
      {data ? (
        <div className="flex flex-col h-full w-full md:pl-6">
          <div className="flex gap-2">
            <ProfileCardCapsul className="bg-blue-200 text-blue-800">
              Chip 1
            </ProfileCardCapsul>
            <ProfileCardCapsul className="bg-yellow-200 text-yellow-800">
              Chip 2
            </ProfileCardCapsul>
            <ProfileCardCapsul className="bg-red-200 text-red-800">
              Chip 3
            </ProfileCardCapsul>
          </div>
          <div className="pt-2 pb-3 text-gray-600 text-sm">
            {data.workExperiences.map((we) => {
              if (we.currentCompany) {
                return (
                  <Current
                    key={we.id}
                    data={we}
                    companies={companies}
                    experienceLevels={experienceLevels}
                  />
                );
              }
            })}
          </div>
          <div className="py-3 text-gray-600 text-sm">
            {data.workExperiences?.map((we) => {
              if (!we.currentCompany) {
                return (
                  <Other
                    key={we.id}
                    data={we}
                    companies={companies}
                    experienceLevels={experienceLevels}
                  />
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
