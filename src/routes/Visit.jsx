import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { visitUserProfile } from "../store/middlewares/user";
import { Info } from "../components/Visit/Info";
import { Details } from "../components/Visit/Details";
import { Availability } from "../components/Visit/Availability";
import { clearVisitingProfile } from "../store/slices/user";
import { UserProfile } from "../components/Profile";

const Visit = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.visitingProfile);

  useEffect(() => {
    if (userId) {
      dispatch(visitUserProfile(userId));
    }
    return () => {
      dispatch(clearVisitingProfile());
    };
  }, [userId]);

  return (
    <>
      {profile ? (
        // <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-3 h-full overflow-hidden">
        //   <div className="col-span-3">
        //     <Info profile={profile} />
        //   </div>
        //   <div className="">
        //     <Availability profile={profile} />
        //   </div>
        //   <div className="col-span-3 overflow-y-auto">
        //     <Details profile={profile} />
        //   </div>
        //   <div className="">{/* <div>Reviews</div> */}</div>
        // </div>
        <UserProfile visit={true} />
      ) : (
        <div />
      )}
    </>
  );
};

export default Visit;
