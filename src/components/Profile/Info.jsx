import { useSelector } from "react-redux";
import { companyNameShortner } from "../../utils/string";
import { getDataLabelFromKey } from "../../utils/data";
import {
  convertISOUTCDayTimeToLocalDayTime,
  timeDistance,
} from "../../utils/timeDate";
import { useEffect, useState } from "react";
import { ProfileCardCapsul } from "../Capsul/ProfileCardCapsul";
import { TextInput } from "../TextInput";

export const Info = ({ data }) => {
  const professions = useSelector((state) => state.profession.items);
  const companies = useSelector((state) => state.static.companies);
  const [currentCompany, setCurrentCompany] = useState();

  useEffect(() => {
    if (data && data.workExperiences && data.workExperiences.length) {
      const current = data.workExperiences.find((we) => we.currentCompany);
      setCurrentCompany(current);
    }
  }, [data]);

  return (
    <div className="bg-white p-3">
      <div className="flex gap-5">
        <div className="flex flex-col items-center">
          <img
            src={data.photoURL}
            alt={"Person Profile Image"}
            className="h-32 w-32 rounded-md"
          />
          <div className="flex gap-2 font-semibold text-md">
            <span>{data.firstName}</span>
            <span>{data.lastName}</span>
          </div>
          <div className="text-sm font-light text-gray-500">{data.country}</div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {currentCompany ? (
            <div className="text-text">
              <div className="text-md font-semibold">
                {companyNameShortner(
                  getDataLabelFromKey(companies, currentCompany.companyId)
                )}
              </div>
              <div className="text-sm font-light">
                {getDataLabelFromKey(professions, currentCompany.professionId)}
              </div>
              <div className="flex gap-1 text-gray-600 text-xs">
                <div>
                  {
                    convertISOUTCDayTimeToLocalDayTime(currentCompany.startDate)
                      .date
                  }{" "}
                  - Present
                </div>
                <div style={{ fontSize: 30 }}>&middot;</div>
                <div>
                  {timeDistance(
                    currentCompany.startDate,
                    currentCompany.endDate
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>Current Company: N/A</div>
          )}
          <div className="flex gap-1 border p-1">
            <ProfileCardCapsul className="bg-purple-200 text-purple-800">
              Chip 1
            </ProfileCardCapsul>
            <ProfileCardCapsul className="bg-purple-200 text-purple-800">
              Chip 2
            </ProfileCardCapsul>
          </div>
          <TextInput
            // label="Bio"
            name={"profileHeadline"}
            placeholder={"Write the headline of your profile"}
            rows="3"
            // value={state.profileHeadline}
            // setValue={handleChange}
          />
        </div>
      </div>
      <div className="flex justify-end text-xs font-bold mt-4">
        <div>cancelation: N/A</div>
        <div>depth of feedback: N/A</div>
        <div>product sense: N/A</div>
        <div>analytics and metrics: N/A</div>
        <div>behavioral: N/A</div>
      </div>
    </div>
  );
};
