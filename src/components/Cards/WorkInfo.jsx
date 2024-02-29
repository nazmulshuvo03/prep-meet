import { useSelector } from "react-redux";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../utils/timeDate";
import { getDataLabelFromKey } from "../../utils/data";
import { companyNameShortner } from "../../utils/string";

const Current = ({ data, companies, professions }) => (
  <div className="text-text">
    <div className="text-md font-semibold">
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div className="text-sm font-light">
      {getDataLabelFromKey(professions, data.professionId)}
    </div>
    <div className="flex gap-1 text-gray-600 text-xs">
      <div>
        {convertISOUTCDayTimeToLocalDayTime(data.startDate).date} - Present
      </div>
      <div style={{ fontSize: 30 }}>&middot;</div>
      <div>{timeDistance(data.startDate, data.endDate)}</div>
    </div>
  </div>
);

const Other = ({ data, companies, professions }) => (
  <div className="flex gap-1">
    <div>
      {companyNameShortner(getDataLabelFromKey(companies, data.companyId))}
    </div>
    <div style={{ fontSize: 30 }}>&middot;</div>
    <div className="text-sm">
      {getDataLabelFromKey(professions, data.professionId)},
    </div>
    <div>{timeDistance(data.startDate, data.endDate)}</div>
  </div>
);

export const WorkInfo = ({ data = null }) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  return (
    <>
      {data ? (
        <div>
          <div className="py-3 text-gray-600 text-sm">
            {data.workExperiences.map((we) => {
              if (we.currentCompany) {
                return (
                  <Current
                    key={we.id}
                    data={we}
                    companies={companies}
                    professions={professions}
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
                    professions={professions}
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
