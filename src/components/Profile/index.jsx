import { useSelector } from "react-redux";
import { Info } from "./Info";
import { AddAvailability } from "./AddAvailability";
import { Details } from "./Details";
import { Schedules } from "./Schedules";
import { DisplayAvailability } from "./DisplayAvailability";
import { Reviews } from "./Reviews";
// import { PersonalAccount } from "../../components/PersonalAccount";

export const UserProfile = ({ visit = false }) => {
  const profile = useSelector((state) =>
    visit ? state.user.visitingProfile : state.user.profile
  );

  return (
    <>
      {profile ? (
        <div className="px-3 md:px-6 pt-3 md:pt-6 pb-4 flex flex-col md:flex-row gap-5 h-full w-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-5 md:flex-1">
            <Info visit={visit} />
            <Details visit={visit} />
          </div>
          <div className="flex flex-col gap-5 md:w-1/3">
            {visit ? <DisplayAvailability /> : <AddAvailability />}
            {visit ? <Reviews /> : <Schedules />}
          </div>
        </div>
      ) : (
        <div />
      )}
      {/* <PersonalAccount /> */}
    </>
  );
};
