import { useSelector } from "react-redux";
import { timeDistance } from "../../utils/timeDate";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";
import { getDataLabelFromKey } from "../../utils/data";

export const WorkInfo = ({ data = null }) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);

  return (
    <>
      {data ? (
        <div>
          <div className="flex gap-2">
            <div>{data.targetProfession?.name}</div>
            <ProfileCardCapsul className="bg-green-200 text-green-800">
              Target Profession
            </ProfileCardCapsul>
          </div>
          <div className="flex items-center">
            {data.companiesOfInterest &&
              data.companiesOfInterest.length &&
              data.companiesOfInterest.map((ci) => (
                <div key={ci}>{getDataLabelFromKey(companies, ci)}</div>
              ))}
            <div>.</div>
            <div className="italic">{data.targetRole?.name}</div>
          </div>
          <div className="py-3 text-gray-600 text-sm">
            {data.workExperiences?.map((we) => (
              <div key={we.id} className="flex items-baseline">
                <div>{getDataLabelFromKey(companies, we.companyId)}</div>
                <div>.</div>
                <div className="text-sm">
                  {getDataLabelFromKey(professions, we.professionId)}
                </div>
                {/* <div>,</div>
                <div>*WorkExpRole</div> */}
                <div>,</div>
                <div>{timeDistance(we.startDate, we.endDate)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};
