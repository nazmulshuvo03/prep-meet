import { useSelector } from "react-redux";
import { PersonalAccount } from "../../components/PersonalAccount";
import { Info } from "./Info";
import { AddAvailability } from "./AddAvailability";
import { Details } from "./Details";
import { Schedules } from "./Schedules";

export const Profile = () => {
  const profile = useSelector((state) => state.user.profile);

  // console.log("@@@@@@@@@@@@@@@@", profile);

  return (
    <>
      {profile ? (
        <div className="px-6 py-10 grid grid-cols-4 gap-3">
          <div className="col-span-3">
            <Info data={profile} />
          </div>
          <div className="">
            <AddAvailability data={profile} />
          </div>
          <div className="col-span-3">
            <Details data={profile} />
          </div>
          <div className="">
            <Schedules data={profile} />
          </div>
        </div>
      ) : (
        <div />
      )}
      {/* <PersonalAccount /> */}
    </>
  );
};
