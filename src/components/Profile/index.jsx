import { useSelector } from "react-redux";
import { Info } from "./Info";
import { AddAvailability } from "./AddAvailability";
import { Details } from "./Details";
import { Schedules } from "./Schedules";
import { DisplayAvailability } from "./DisplayAvailability";
// import { PersonalAccount } from "../../components/PersonalAccount";

export const UserProfile = ({ visit = false }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  return (
    <>
      {profile ? (
        <div className="px-3 md:px-10 pt-3 md:pt-6 pb-2 grid grid-cols-1 md:grid-cols-4 gap-3 h-full overflow-y-auto overflow-x-hidden">
          <div className="col-span-3">
            <Info visit={visit} />
          </div>
          <div className="col-span-3 md:col-span-1">
            {visit ? <DisplayAvailability /> : <AddAvailability />}
          </div>
          <div className="col-span-3">
            <Details visit={visit} />
          </div>
          <div className="col-span-3 md:col-span-1">
            {!visit ? <Schedules /> : <div />}
          </div>
        </div>
      ) : (
        <div />
      )}
      {/* <PersonalAccount /> */}
    </>
  );
};
