import { useSelector } from "react-redux";
import { Info } from "./Info";
import { AddAvailability } from "./AddAvailability";
import { Details } from "./Details";
import { Schedules } from "./Schedules";
// import { PersonalAccount } from "../../components/PersonalAccount";

export const UserProfile = () => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <>
      {profile ? (
        <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-3 h-full overflow-hidden">
          <div className="col-span-3">
            <Info />
          </div>
          <div className="">
            <AddAvailability />
          </div>
          <div className="col-span-3 overflow-y-auto">
            <Details />
          </div>
          <div className="">
            <Schedules />
          </div>
        </div>
      ) : (
        <div />
      )}
      {/* <PersonalAccount /> */}
    </>
  );
};
